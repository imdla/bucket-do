package com.example.api.domain.user.dto.response;

import com.example.api.domain.user.entity.User;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignupResponseDto {

    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static SignupResponseDto from(User entity) {
        return SignupResponseDto.builder()
            .id(entity.getId())
            .username(entity.getUsername())
            .email(entity.getEmail())
            .phoneNumber(entity.getPhoneNumber())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .build();
    }
}
