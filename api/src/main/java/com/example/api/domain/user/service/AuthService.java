package com.example.api.domain.user.service;

import com.example.api.domain.user.dto.request.LoginRequestDto;
import com.example.api.domain.user.dto.request.SignupRequestDto;
import com.example.api.domain.user.dto.response.LoginResponseDto;
import com.example.api.domain.user.dto.response.SignupResponseDto;
import com.example.api.domain.user.dto.response.TokenResponseDto;
import com.example.api.domain.user.entity.RefreshToken;
import com.example.api.domain.user.entity.User;
import com.example.api.domain.user.repository.RefreshTokenRepository;
import com.example.api.domain.user.repository.UserRepository;
import com.example.api.global.exception.RefreshTokenNotFoundException;
import com.example.api.global.exception.ResourceNotFoundException;
import com.example.api.global.security.jwt.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RedisTemplate<String, String> redisTemplate;

    @Transactional
    public SignupResponseDto signup(SignupRequestDto requestDto) {
        if (userRepository.existsByUsername(requestDto.getUsername())) {
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }

        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());

        User user = requestDto.toEntity(encodedPassword);

        return SignupResponseDto.from(userRepository.save(user));
    }

    @Transactional
    public LoginResponseDto login(LoginRequestDto requestDto, HttpServletResponse response) {
        if (!userRepository.existsByUsername(requestDto.getUsername())) {
            throw new UsernameNotFoundException("일치하는 아이디를 찾을 수 없습니다.");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(requestDto.getUsername());
        String storedPassword = userDetails.getPassword();

        if (!passwordEncoder.matches(requestDto.getPassword(), storedPassword)) {
            throw new BadCredentialsException("입력한 아이디에 대한 비밀번호가 일치하지 않습니다.");
        }

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                requestDto.getUsername(),
                requestDto.getPassword()
            )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 액세스 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(authentication);
        // 리프레시 토큰 생성
        String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

        User user = userRepository.findByUsername(requestDto.getUsername())
            .orElseThrow(() -> new ResourceNotFoundException("일치하는 사용자를 찾을 수 없습니다."));

        refreshTokenService.saveOrUpdateRefreshToken(user, refreshToken);

        addCookie(response, "refreshToken", refreshToken, 7 * 24 * 60 * 60);

        return LoginResponseDto.from(user, accessToken, refreshToken);
    }

    private void addCookie(HttpServletResponse response, String token, String value,
        int maxAge) {
        Cookie cookie = new Cookie(token, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    @Transactional
    public void logout(HttpServletRequest requestDto) {
        Cookie[] cookies = requestDto.getCookies();
        if (cookies == null) {
            throw new IllegalArgumentException("refresh token이 없습니다.");
        }

        String refreshToken = Arrays.stream(cookies)
            .filter(cookie -> "refreshToken".equals(cookie.getName()))
            .map(Cookie::getValue)
            .findFirst()
            .orElse(null);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 요청 헤더로 전달받은 access token을 추출
        String accessToken = (String) authentication.getCredentials();

        Date expiration = jwtTokenProvider.extractExpiration(accessToken);
        long now = System.currentTimeMillis();
        long ttl = (expiration.getTime() - now) / 1000;

        log.info("ttl : " + ttl);

        // Redis에 액세스 토큰 저장
        redisTemplate.opsForValue()
            .set("blacklist: " + accessToken, "logout", ttl, TimeUnit.SECONDS);

        // 요청에 리프레시 토큰이 포함되었는지 검증
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new IllegalArgumentException("요청 바디에 refresh token이 입력되지 않았습니다.");
        }

        // 리프레시 토큰이 만료되었는지 검증
        if (jwtTokenProvider.validateTokenExpired(refreshToken)) {
            throw new ExpiredJwtException(null, null, "refresh token이 만료되었습니다.");
        }

        // 리프레시 토큰이 유효한지, 위조되지 않았는지 검증
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new JwtException("refresh token이 위조되었거나 유효하지 않습니다.");
        }

        // 리프레시 토큰 유효성 검사 (DB에 저장한 리프레시 토큰과 비교)
        Optional<RefreshToken> storedRefreshToken = refreshTokenService.getRefreshToken(
            refreshToken);

        if (storedRefreshToken.isEmpty()) {
            throw new RefreshTokenNotFoundException("일치하는 refresh token을 찾을 수 없습니다.");
        }

        // 리프레시 토큰에 대한 유효성이 검증되었으면 DB에서 해당 리프레시 토큰을 삭제
        refreshTokenRepository.delete(storedRefreshToken.get());
    }

    @Transactional
    public TokenResponseDto createNewAccessToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            throw new IllegalArgumentException("refresh token이 없습니다.");
        }

        String refreshToken = Arrays.stream(cookies)
            .filter(cookie -> "refreshToken".equals(cookie.getName()))
            .map(Cookie::getValue)
            .findFirst()
            .orElse(null);

        // 요청에 리프레시 토큰이 포함되었는지 검증
        if (refreshToken == null) {
            throw new IllegalArgumentException("refresh token이 null 또는 빈 문자열로 입력되었습니다.");
        }

        // 리프레시 토큰이 만료되었는지 검증
        if (jwtTokenProvider.validateTokenExpired(refreshToken)) {
            throw new ExpiredJwtException(null, null, "refresh token이 만료되었습니다.");
        }

        // 리프레시 토큰이 유효한지, 위조되지 않았는지 검증
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new JwtException("refresh token이 위조되었거나 유효하지 않습니다.");
        }

        // 리프레시 토큰 유효성 검사 (DB에 저장한 리프레시 토큰과 비교)
        Optional<RefreshToken> storedRefreshToken = refreshTokenService.getRefreshToken(
            refreshToken);

        if (storedRefreshToken.isEmpty()) {
            throw new RefreshTokenNotFoundException("일치하는 refresh token을 찾을 수 없습니다.");
        }

        // 새로운 액세스 토큰 발급
        String newAccessToken = refreshTokenService.generateNewAccessToken(refreshToken);

        return new TokenResponseDto(newAccessToken);
    }

    public boolean checkUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
