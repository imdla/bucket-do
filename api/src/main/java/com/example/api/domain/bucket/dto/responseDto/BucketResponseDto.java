package com.example.api.domain.bucket.dto.responseDto;

import com.example.api.domain.bucket.entity.Bucket;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BucketResponseDto {

    private final Long id;
    private final String title;
    private final String image_path;
    private final boolean is_completed;
    private final LocalDateTime created_at;
    private final LocalDateTime updated_at;
    private final Integer todo_all;
    private final Integer todo_completed;

    public static BucketResponseDto from(Bucket entity) {
        return BucketResponseDto.builder()
            .id(entity.getId())
            .title(entity.getTitle())
            .image_path(entity.getImage_path())
            .is_completed(entity.is_completed())
            .created_at(entity.getCreatedAt())
            .updated_at(entity.getUpdatedAt())
            .todo_all(entity.getTodo_all())
            .todo_completed(entity.getTodo_completed())
            .build();
    }
}
