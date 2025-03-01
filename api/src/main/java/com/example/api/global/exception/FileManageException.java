package com.example.api.global.exception;

public class FileManageException extends RuntimeException {

    public FileManageException(String message) {
        super(message);
    }

    public FileManageException() {
        super("파일 업로드 실패");
    }
}