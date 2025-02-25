package com.example.api.domain.todo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class TodoRequestDto {

    private String content;
    private boolean isCompleted;
}
