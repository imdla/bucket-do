package com.example.api.domain.bucket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UsernameCheckResponseDto {

    private String message;
    private boolean available;
}
