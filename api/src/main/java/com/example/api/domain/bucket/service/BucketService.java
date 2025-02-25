package com.example.api.domain.bucket.service;

import com.example.api.domain.bucket.dto.requestDto.BucketRequestDto;
import com.example.api.domain.bucket.dto.responseDto.BucketResponseDto;
import com.example.api.domain.bucket.dto.responseDto.BucketUpdateResponseDto;
import com.example.api.domain.bucket.entity.Bucket;
import com.example.api.domain.bucket.repository.BucketRepository;
import com.example.api.domain.user.entity.User;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BucketService {

    private final BucketRepository bucketRepository;
    private final S3Service s3Service;

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
        // 수정할 버킷 조회
        Bucket bucket = bucketRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 버킷을 찾을 수 없습니다."));

        // 기존 이미지 삭제
        if (bucket.getS3Key() != null) {
            s3Service.deleteFile(bucket.getS3Key());
        }

        // S3 파일 업로드
        // S3Service uploadFile() 호출
        Map<String, String> uploadResult = s3Service.uploadFile(requestDto.getFile());

        String image_path = uploadResult.get("image_path");
        String s3Key = uploadResult.get("s3Key");

        // 수정된 제목, 이미지 파일을 보내서 버킷 업데이트
        bucket.update(requestDto, image_path, s3Key);

        return BucketUpdateResponseDto.from(bucket);
    }

    // 버킷 삭제
    @Transactional
    public void deleteBucket(Long id, User user) {
        Bucket bucket = bucketRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 버킷을 찾을 수 없습니다."));

        bucketRepository.delete(bucket);
    }
}
