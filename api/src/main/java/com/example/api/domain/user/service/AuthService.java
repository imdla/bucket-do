package com.example.api.domain.user.service;

import com.example.api.domain.user.dto.request.LoginRequestDto;
import com.example.api.domain.user.dto.request.RefreshTokenRequestDto;
import com.example.api.domain.user.dto.request.SignupRequestDto;
import com.example.api.domain.user.dto.response.LoginResponseDto;
import com.example.api.domain.user.dto.response.SignupResponseDto;
import com.example.api.domain.user.entity.RefreshToken;
import com.example.api.domain.user.entity.User;
import com.example.api.domain.user.repository.RefreshTokenRepository;
import com.example.api.domain.user.repository.UserRepository;
import com.example.api.global.exception.ResourceNotFoundException;
import com.example.api.global.security.jwt.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

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
            throw new ResourceNotFoundException("일치하는 아이디를 찾을 수 없습니다.");
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

    private void addCookie(HttpServletResponse response, String username, String value, int maxAge) {
        Cookie cookie = new Cookie(username, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    @Transactional
    public void logout(RefreshTokenRequestDto requestDto) {
        String refreshToken = requestDto.getRefreshToken();

        // 요청에 리프레시 토큰이 포함되었는지 검증
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new IllegalArgumentException("요청 바디에 refresh token이 입력되지 않았습니다.");
        }

        // 리프레시 토큰이 만료되었는지 검증
        if (jwtTokenProvider.validateTokenExpired(refreshToken)) {
            throw new ExpiredJwtException(null, null, "refresh token이 만료되었습니다.");
        }

        // 리프레시 토큰이 유효한지(위조되지 않았는지) 검증
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new JwtException("refresh token이 위조되었거나 유효하지 않습니다.");
        }

        // DB에 해당 리프레시 토큰이 존재하는지 검증
        Optional<RefreshToken> storedRefreshToken = refreshTokenRepository.findByToken(
                refreshToken);

        if (storedRefreshToken.isEmpty()) {
            throw new ResourceNotFoundException("일치하는 refresh token을 찾을 수 없습니다.");
        }

        // 리프레시 토큰에 대한 유효성이 검증되었으면 DB에서 해당 리프레시 토큰을 삭제
        refreshTokenRepository.delete(storedRefreshToken.get());
    }

    public boolean checkUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
