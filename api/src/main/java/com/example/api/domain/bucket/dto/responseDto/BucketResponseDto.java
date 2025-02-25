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
    private final String imageUrl;
    private final boolean isCompleted;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
    private final int todoAll;
    private final int todoCompleted;

    public static BucketResponseDto from(Bucket entity) {
        return BucketResponseDto.builder()
            .id(entity.getId())
            .title(entity.getTitle())
            .imageUrl(entity.getImageUrl())
            .isCompleted(entity.isCompleted())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .todoAll(entity.getTodoAll())
            .todoCompleted(entity.getTodoCompleted())
            .build();
    }
}
