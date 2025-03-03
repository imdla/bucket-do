package com.example.api.domain.user.service;

import com.example.api.domain.user.entity.RefreshToken;
import com.example.api.domain.user.entity.User;
import com.example.api.domain.user.repository.RefreshTokenRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

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
}
