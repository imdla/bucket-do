package com.example.api.domain.bucket.controller;

import com.example.api.domain.bucket.dto.requestDto.BucketRequestDto;
import com.example.api.domain.bucket.dto.responseDto.BucketResponseDto;
import com.example.api.domain.bucket.dto.responseDto.BucketUpdateResponseDto;
import com.example.api.domain.bucket.service.BucketService;
import com.example.api.domain.user.entity.User;
import com.example.api.global.response.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/buckets")
public class BucketController {

    private final BucketService bucketService;

    // 해당 유저가 작성한 버킷 전체 조회
    @GetMapping
    public ResponseEntity<ApiResponse<List<BucketResponseDto>>> getBuckets(
        @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.ok(
            "전체 버킷이 조회되었습니다.",
            "OK",
            bucketService.getBuckets(user)
        ));
    }

    // 버킷 생성
    @PostMapping
    public ResponseEntity<ApiResponse<BucketResponseDto>> createBucket(
        @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.ok(
            "버킷이 생성되었습니다.",
            "CREATED",
            bucketService.createBucket(user)
        ));
    }

    // 버킷 수정
    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<BucketUpdateResponseDto>> updateBucket(@PathVariable Long id,
        @Valid @RequestBody BucketRequestDto requestDto,
        @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.ok(
            "버킷이 수정되었습니다.",
            "OK",
            bucketService.updateBucket(id, requestDto, user)
        ));
    }

    // 버킷 삭제
    @DeleteMapping("/{id}")
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
