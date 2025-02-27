package com.example.api.domain.todo.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TodoListResponseDto {

    private final Long fixedTodoId;
    private final List<TodoResponseDto> todos;

    public static TodoListResponseDto from(Long fixedTodoId, List<TodoResponseDto> todos) {
        return new TodoListResponseDto(fixedTodoId, todos);
    }
}
