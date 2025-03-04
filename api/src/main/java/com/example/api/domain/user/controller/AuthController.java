package com.example.api.domain.user.controller;

import com.example.api.domain.bucket.dto.response.UsernameCheckResponseDto;
import com.example.api.domain.user.dto.request.LoginRequestDto;
import com.example.api.domain.user.dto.request.RefreshTokenRequestDto;
import com.example.api.domain.user.dto.request.SignupRequestDto;
import com.example.api.domain.user.dto.response.LoginResponseDto;
import com.example.api.domain.user.dto.response.SignupResponseDto;
import com.example.api.domain.user.service.AuthService;
import com.example.api.global.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            @Valid @RequestBody LoginRequestDto requestDto,
            HttpServletResponse response
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
                "로그인 정상 성공",
                "OK",
                authService.login(requestDto, response)
        ));
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @RequestBody RefreshTokenRequestDto requestDto) {

        authService.logout(requestDto);

        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(ApiResponse.ok("로그아웃되었습니다.", "NO_CONTENT", null));
    }

    // 단순히 JWT 검증을 위한 endpoint
    @GetMapping("/auth/verify")
    public void verify() {
    }

    // 아이디 중복 체크 ( 중복이면 true)
    @GetMapping("/auth/users")
    public ResponseEntity<UsernameCheckResponseDto> checkUsername(@RequestParam String username) {
        boolean isAvailable = !authService.checkUsername(username);
        String message = isAvailable ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다.";

        return ResponseEntity.ok(new UsernameCheckResponseDto(message, isAvailable));
    }
}
