package com.example.api.domain.user.service;

import com.example.api.domain.user.dto.response.OAuth2ResponseDto;
import com.example.api.domain.user.entity.User;
import com.example.api.domain.user.repository.UserRepository;
import com.example.api.global.security.jwt.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // OAuth2User에서 사용자 정보 가져오기
        String email = (String) oAuth2User.getAttributes().get("email");
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));

//        UsernamePasswordAuthenticationToken authentication =
//            new UsernamePasswordAuthenticationToken(user, null);

        // JWT 발급
        String accessToken = jwtTokenProvider.createOAuth2AccessToken(user.getUsername());
        log.info(accessToken);
        String refreshToken = jwtTokenProvider.createOAuth2RefreshToken(user.getUsername());
        log.info(refreshToken);

        // RefreshToken 저장 (선택)
        refreshTokenService.saveOrUpdateRefreshToken(user, refreshToken);

        OAuth2ResponseDto responseDto = OAuth2ResponseDto.builder()
            .id(user.getId())
            .username(user.getUsername())
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();

        // ✅ JSON으로 응답
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(responseDto));
    }
}
