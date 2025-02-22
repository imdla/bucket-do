package com.example.api.domain.bucket.repository;

import com.example.api.domain.bucket.entity.Bucket;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketRepository extends JpaRepository<Bucket, Long> {

    List<Bucket> findAllByUserId(Long userId);
}
