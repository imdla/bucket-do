package com.example.api.global.exception;

public class FileUploadException extends RuntimeException {

    public FileUploadException(String message) {
        super(message);
    }

    public FileUploadException() {
        super("파일 업로드 실패");
    }
}