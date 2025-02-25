package com.example.api.domain.bucket.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UsernameCheckResponse {

    private String message;
    private boolean available;
}
