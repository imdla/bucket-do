package com.example.api.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OAuth2ResponseDto {

    private Long id;
    private String username;
    private String accessToken;
    private String refreshToken;
}
