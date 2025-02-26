package com.example.api.domain.todo.controller;

import com.example.api.domain.todo.dto.request.TodoRequestDto;
import com.example.api.domain.todo.dto.response.TodoResponseDto;
import com.example.api.domain.todo.service.TodoService;
import com.example.api.global.response.ApiResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/buckets")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    //     빈버킷 생성
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

    @GetMapping("/{id}/todos")
    public ResponseEntity<ApiResponse<List<TodoResponseDto>>> getTodos(@PathVariable Long id) {
        List<TodoResponseDto> todos = todoService.findTodosByBucketId(id);
        return ResponseEntity.ok(ApiResponse.ok("투두리스트가 조회되었습니다.", "OK", todos));
    }

    @PatchMapping("/{bucketId}/todos/{todoId}")
    public ResponseEntity<ApiResponse<TodoResponseDto>> updateTodo(
        @PathVariable Long bucketId,
        @PathVariable Long todoId,
        @RequestBody TodoRequestDto requestDto
    ) {
        TodoResponseDto updatedTodo = todoService.updateTodo(bucketId, todoId, requestDto);
        return ResponseEntity.ok(ApiResponse.ok("투두가 수정되었습니다.", "OK", updatedTodo));

    }
}
