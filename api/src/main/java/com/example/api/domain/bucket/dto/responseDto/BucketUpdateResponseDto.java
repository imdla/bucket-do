package com.example.api.domain.bucket.dto.responseDto;

import com.example.api.domain.bucket.entity.Bucket;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BucketUpdateResponseDto {

    private final Long id;
    private final String title;
    private final String image_path;
    private final String originalFileName;
    private final LocalDateTime created_at;
    private final LocalDateTime updated_at;

    public static BucketUpdateResponseDto from(Bucket entity) {
        return BucketUpdateResponseDto.builder()
            .id(entity.getId())
            .title(entity.getTitle())
            .image_path(entity.getImage_path())
            .originalFileName(entity.getOriginalFileName())
            .created_at(entity.getCreatedAt())
            .updated_at(entity.getUpdatedAt())
            .build();
    }
}
