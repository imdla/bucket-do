package com.example.api.domain.user.controller;

import com.example.api.domain.user.dto.requestDto.LoginRequestDto;
import com.example.api.domain.user.dto.requestDto.SignupRequestDto;
import com.example.api.domain.user.dto.responseDto.LoginResponseDto;
import com.example.api.domain.user.dto.responseDto.SignupResponseDto;
import com.example.api.domain.user.service.AuthService;
import com.example.api.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignupResponseDto>> signup(
        @Valid @RequestBody SignupRequestDto requestDto) {
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.ok(
                "유저가 정상적으로 생성되었습니다.",
                "CREATED",
                authService.signup(requestDto)
            ));
    }

    @GetMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(
        @Valid @RequestBody LoginRequestDto requestDto
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
            "로그인 정상 성공",
            "OK",
            authService.login(requestDto)
        ));
    }
}
