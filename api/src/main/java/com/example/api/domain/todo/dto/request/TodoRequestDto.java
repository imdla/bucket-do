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
    @JsonProperty("checkCompleted")
    private boolean checkCompleted;

//    public Todo toEntity(Bucket bucket) {
//        return Todo.builder()
//            .content(this.content)
//            .checkCompleted(this.checkCompleted)
//            .bucket(bucket)
//            .build();
//    }
}
