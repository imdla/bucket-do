package com.example.api.domain.bucket.dto.response;

import com.example.api.domain.bucket.entity.Bucket;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BucketUpdateResponseDto {

    private final Long id;
    private final String title;
    private final String imageUrl;
    private final String originalFileName;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static BucketUpdateResponseDto from(Bucket entity) {
        return BucketUpdateResponseDto.builder()
            .id(entity.getId())
            .title(entity.getTitle())
            .imageUrl(entity.getImageUrl())
            .originalFileName(entity.getOriginalFileName())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .build();
    }
}
