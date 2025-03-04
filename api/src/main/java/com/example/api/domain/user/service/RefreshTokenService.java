package com.example.api.domain.user.service;

import com.example.api.domain.user.entity.RefreshToken;
import com.example.api.domain.user.entity.User;
import com.example.api.domain.user.repository.RefreshTokenRepository;
import com.example.api.global.security.jwt.JwtTokenProvider;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserDetailsService userDetailsService;

    @Transactional
    public void saveOrUpdateRefreshToken(User user, String refreshToken) {
        Optional<RefreshToken> existingToken = refreshTokenRepository.findByUser(user);
        if (existingToken.isPresent()) {
            existingToken.get().updateToken(refreshToken);
        } else {
            RefreshToken newToken = new RefreshToken(null, user, refreshToken);
            refreshTokenRepository.save(newToken);
        }
    }

    public Optional<RefreshToken> getRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public String generateNewAccessToken(String refreshToken) {
        // 리프레시 토큰에서 사용자 정보 가져오기
        String username = jwtTokenProvider.getUsername(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // 새로운 액세스 토큰 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
            userDetails.getAuthorities());
        return jwtTokenProvider.createAccessToken(authentication);
    }
}
