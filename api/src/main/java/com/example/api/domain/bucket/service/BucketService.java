package com.example.api.domain.bucket.service;

import com.example.api.domain.bucket.dto.requestDto.BucketRequestDto;
import com.example.api.domain.bucket.dto.responseDto.BucketResponseDto;
import com.example.api.domain.bucket.dto.responseDto.BucketUpdateResponseDto;
import com.example.api.domain.bucket.entity.Bucket;
import com.example.api.domain.bucket.repository.BucketRepository;
import com.example.api.domain.user.entity.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BucketService {

    private final BucketRepository bucketRepository;

    public List<BucketResponseDto> getBuckets(User user) {
        return bucketRepository.findAllByUserId(user.getId()).stream()
            .map(BucketResponseDto::from)
            .toList();
    }

    // 버킷 생성
    @Transactional
    public BucketResponseDto createBucket(User user) {
        Bucket emptyBucket = bucketRepository.save(new Bucket(null, null, user));

        return BucketResponseDto.from(emptyBucket);
    }

    // 버킷 수정
    @Transactional
    public BucketUpdateResponseDto updateBucket(Long id, BucketRequestDto requestDto, User user) {
        Bucket bucket = bucketRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 버킷을 찾을 수 없습니다."));
        bucket.update(requestDto);

        return BucketUpdateResponseDto.from(bucket);
    }
}
