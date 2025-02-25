package com.example.api.domain.todo.controller;

import com.example.api.domain.todo.dto.response.TodoResponseDto;
import com.example.api.domain.todo.service.TodoService;
import com.example.api.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/buckets")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;


    @PostMapping("/{id}/todos")
    public ResponseEntity<ApiResponse<TodoResponseDto>> createTodo(@PathVariable Long id) {
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(
                ApiResponse.ok(
                    "투두가 정상적으로 생성되었습니다.",
                    "CREATED",
                    todoService.createTodo(id)
                )
            );
    }
}
