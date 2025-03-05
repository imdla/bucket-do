package com.example.api.domain.user.service;

import com.example.api.domain.user.entity.User;
import com.example.api.domain.user.repository.UserRepository;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
//    private final JwtTokenProvider jwtTokenProvider;
//    private final RefreshTokenService refreshTokenService;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest)
        throws OAuth2AuthenticationException {

        // 소셜에서 인증 받은 유저 정보 가져오기
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        // 소셜 로그인 제공자 이름(google, kakao, naver)
        String provider = oAuth2UserRequest.getClientRegistration().getRegistrationId();

        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfo.of(provider, oAuth2User.getAttributes());

        log.info("소셜 로그인 제공자: {}", provider);
        log.info("소셜 로그인 ID: {}", oAuth2UserInfo.getId());
        log.info("소셜 로그인 이메일: {}", oAuth2UserInfo.getEmail());

        // 가입한 유저인지 확인(
        User user = userRepository.findByUsername(oAuth2UserInfo.getId())
            .orElseGet(() -> saveUser(oAuth2UserInfo, provider));

        return new DefaultOAuth2User(
            Collections.emptySet(),
            oAuth2User.getAttributes(),
            "sub"
        );

    }

    private User saveUser(OAuth2UserInfo userInfo, String provider) {
        // 새로운 유저 저장
        User newUser = User.builder()
            .username(userInfo.getId())  // username을 소셜 로그인 ID로 설정
            .password(userInfo.getPassword())  // 실제 사용 X
            .email(userInfo.getEmail())
            .provider(provider)
            .build();
        return userRepository.save(newUser);
    }
}
