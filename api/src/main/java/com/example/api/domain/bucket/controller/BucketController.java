package com.example.api.domain.bucket.controller;

import com.example.api.domain.bucket.dto.responseDto.BucketResponseDto;
import com.example.api.domain.bucket.service.BucketService;
import com.example.api.domain.user.entity.User;
import com.example.api.global.response.ApiResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            "버킷리스트 전체 조회 성공",
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
}
