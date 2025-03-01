package com.example.api.domain.bucket.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BucketRequestDto {

    @NotBlank(message = "제목은 필수 입력값입니다.")
    @Length(max = 20, message = "제목은 20글자 이내로 입력해주세요.")
    private String title;
    private MultipartFile file;
}
