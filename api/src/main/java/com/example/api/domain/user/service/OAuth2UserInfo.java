package com.example.api.domain.user.service;

import com.example.api.domain.user.entity.User;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class OAuth2UserInfo {

    private String id;
    private String password;
    private String email;
    private String nickname;
    private String provider;

    public static OAuth2UserInfo of(String provider, Map<String, Object> attributes) {
        switch (provider) {
            case "google":
                return ofGoogle(attributes);
            case "kakao":
                return ofKakao(attributes);
            case "naver":
                return ofNaver(attributes);
            default:
                throw new RuntimeException();
        }
    }

    private static OAuth2UserInfo ofGoogle(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
            .provider("google")
            .id("google_" + (String) attributes.get("sub"))
            .password((String) attributes.get("sub"))
            .nickname((String) attributes.get("name"))
            .email((String) attributes.get("email"))
            .build();
    }

    private static OAuth2UserInfo ofKakao(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
            .provider("kakao")
            .id("kakao_" + attributes.get("id").toString())
            .password(attributes.get("id").toString())
            .nickname((String) ((Map) attributes.get("properties")).get("nickname"))
            .build();
    }

    private static OAuth2UserInfo ofNaver(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
            .provider("naver")
            .id("naver_" + (String) ((Map) attributes.get("response")).get("id"))
            .password((String) ((Map) attributes.get("response")).get("id"))
            .nickname((String) ((Map) attributes.get("response")).get("name"))
            .build();
    }

    public User toEntity() {
        return User.builder()
            .username(id)
            .password(password)
            .provider(provider)
//            .nickname(nickname)
            .email(email)
            .build();
    }
}
