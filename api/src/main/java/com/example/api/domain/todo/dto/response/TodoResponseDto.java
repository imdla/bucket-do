package com.example.api.domain.todo.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TodoResponseDto {

    private Long id;
    private String content;

}
