package com.example.api.domain.todo.dto.response;

import com.example.api.domain.todo.entity.Todo;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TodoResponseDto {

    private final Long id;
    private final Long bucketId;
    private final String content;
    private final boolean isCompleted;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
    
    public static TodoResponseDto from(Todo entity) {
        return TodoResponseDto.builder()
            .id(entity.getId())
            .bucketId(entity.getBucket().getId())
            .content(entity.getContent())
            .isCompleted(entity.isCompleted())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .build();
    }

}
