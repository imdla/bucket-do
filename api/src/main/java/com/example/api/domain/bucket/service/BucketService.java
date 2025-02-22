package com.example.api.domain.bucket.service;

import com.example.api.domain.bucket.dto.responseDto.BucketResponseDto;
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
}
