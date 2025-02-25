package com.example.api.global.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException() {
        super("일치하는 데이터를 찾을 수 없습니다.");
    }
}
