package com.example.api.domain.todo.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodoRequestDto {

    private String content;
    @JsonProperty("isCompleted")
    private boolean isCompleted;

//    public Todo toEntity(Bucket bucket) {
//        return Todo.builder()
//            .content(this.content)
//            .isCompleted(this.isCompleted)
//            .bucket(bucket)
//            .build();
//    }
}
