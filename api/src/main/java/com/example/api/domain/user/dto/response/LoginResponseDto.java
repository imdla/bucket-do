package com.example.api.domain.user.dto.response;

import com.example.api.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {

    private Long id;
    private String token;
    private String username;

    public static LoginResponseDto from(User entity, String token) {
        return LoginResponseDto.builder()
            .id(entity.getId())
            .username(entity.getUsername())
            .token(token)
            .build();
    }
}
