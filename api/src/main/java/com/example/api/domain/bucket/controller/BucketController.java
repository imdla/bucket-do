package com.example.api.domain.bucket.controller;

import com.example.api.domain.bucket.dto.requestDto.BucketRequestDto;
import com.example.api.domain.bucket.dto.responseDto.BucketResponseDto;
import com.example.api.domain.bucket.dto.responseDto.BucketUpdateResponseDto;
import com.example.api.domain.bucket.service.BucketService;
import com.example.api.domain.user.entity.User;
import com.example.api.global.response.ApiResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BucketController {

    private final BucketService bucketService;

    // 해당 유저가 작성한 버킷 전체 조회
    @GetMapping("/buckets")
    public ResponseEntity<ApiResponse<List<BucketResponseDto>>> getBuckets(
        @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.ok(
            "전체 버킷이 조회되었습니다.",
            "OK",
            bucketService.getBuckets(user)
        ));
    }

    // 버킷 생성
    @PostMapping("/buckets")
    public ResponseEntity<ApiResponse<BucketResponseDto>> createBucket(
        @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.ok(
            "버킷이 생성되었습니다.",
            "CREATED",
            bucketService.createBucket(user)
        ));
    }

    // 버킷 수정
    @PatchMapping("/buckets/{id}")
    public ResponseEntity<ApiResponse<BucketUpdateResponseDto>> updateBucket(@PathVariable Long id,
        @RequestPart(value = "title", required = false) String title,
        @RequestPart(value = "file", required = false) MultipartFile file,
        @AuthenticationPrincipal User user) {

        BucketRequestDto requestDto = BucketRequestDto.builder()
            .title(title)
            .file(file)
            .build();

        return ResponseEntity.ok(ApiResponse.ok(
            "버킷이 수정되었습니다.",
            "OK",
            bucketService.updateBucket(id, requestDto, user)
        ));
    }

    // 버킷 삭제
    @DeleteMapping("/buckets/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBucket(@PathVariable Long id,
        @AuthenticationPrincipal User user) {
        bucketService.deleteBucket(id, user);

        return ResponseEntity.ok(ApiResponse.ok(
            "버킷이 삭제되었습니다.",
            "NO CONTENT",
            null
        ));
    }
}
