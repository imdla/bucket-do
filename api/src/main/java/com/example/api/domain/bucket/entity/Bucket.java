package com.example.api.domain.bucket.entity;

import com.example.api.domain.bucket.dto.requestDto.BucketRequestDto;
import com.example.api.domain.user.entity.User;
import com.example.api.global.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bucket extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bucket_id")
    private Long id;

    @Column(length = 20)
    private String title;
    private LocalDateTime deadline;
    @Column(nullable = false)
    private boolean is_completed;

    // S3 객체의 접근 URL
    // AWS S3 버킷 객체의 URL
    @Column(nullable = true)
    private String image_path;

    // S3 객체의 키(식별자)
    // 버킷 내 객체를 구분하기 위해 필요하다.
    // 객체 삭제에 활용되는 필드
    @Column(nullable = true)
    private String s3Key;

    // 업로드 파일의 원본 파일명
    // 화면 출력용
    @Column(nullable = true)
    private String originalFileName;

    @Column(nullable = false)
    private int todo_all;
    @Column(nullable = false)
    private int todo_completed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    public Bucket(String title, String image_path, User user) {
        this.title = title;
        this.image_path = image_path;
        this.user = user;
    }

    @Builder
    public Bucket(String title, String image_path, String s3Key, String originalFileName,
        User user) {
        this.title = title;
        this.image_path = image_path;
        this.s3Key = s3Key;
        this.originalFileName = originalFileName;
        this.user = user;
    }

    public Bucket update(BucketRequestDto requestDto, String image_path) {
        this.title = requestDto.getTitle();
        this.image_path = image_path;
        this.originalFileName = requestDto.getFile().getOriginalFilename();
        return this;
    }
}
