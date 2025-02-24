package com.example.api.domain.bucket.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BucketRequestDto {

    private String title;
//    private MultipartFile image;
}
