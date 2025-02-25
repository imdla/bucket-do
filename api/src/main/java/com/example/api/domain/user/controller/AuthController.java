package com.example.api.domain.user.controller;

import com.example.api.domain.bucket.dto.responseDto.UsernameCheckResponse;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/auth/signup")
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

    @PostMapping("/auth/login")
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(
        @Valid @RequestBody LoginRequestDto requestDto
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
            "로그인 정상 성공",
            "OK",
            authService.login(requestDto)
        ));
    }

    // 단순히 JWT 검증을 위한 endpoint
    @GetMapping("/auth/verify")
    public void verify() {
    }

    // 아이디 중복 체크 ( 중복이면 true)
    @GetMapping("/auth/users")
    public ResponseEntity<UsernameCheckResponse> checkUsername(@RequestParam String username) {
        boolean isAvailable = !authService.checkUsername(username);
        String message = isAvailable ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다.";

        return ResponseEntity.ok(new UsernameCheckResponse(message, isAvailable));
    }
}
