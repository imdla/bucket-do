package com.example.api.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Map;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private final String message;
    private final String code;      // 비즈니스 코드
    private final T data;
    private final Map<String, String> errors;

    private ApiResponse(T data) {
        this.message = "Success";
        this.code = "SUCCESS";
        this.data = data;
        this.errors = null;
    }

    private ApiResponse(String message, String code, T data, Map<String, String> errors) {
        this.message = message;
        this.code = code;
        this.data = data;
        this.errors = errors;
    }

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(data);
    }

    public static <T> ApiResponse<T> ok(String message, String code, T data) {
        return new ApiResponse<>(message, code, data, null);
    }

    public static <T> ApiResponse<T> error(String message, String code) {
        return new ApiResponse<>(message, code, null, null);
    }

    public static <T> ApiResponse<T> error(String message, String code,
        Map<String, String> errors) {
        return new ApiResponse<>(message, code, null, errors);
    }
}