package com.example.api.global.exception;

public class RefreshTokenNotFoundException extends RuntimeException {

    public RefreshTokenNotFoundException(String message) {
        super(message);
    }

    public RefreshTokenNotFoundException() {
        super("일치하는 토큰을 찾을 수 없습니다.");
    }
}
