package com.example.api.domain.bucket.entity;

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
    private boolean checkCompleted;

    // S3 객체의 접근 URL
    // AWS S3 버킷 객체의 URL
    @Column(nullable = true)
    private String imageUrl;

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
    private int todoAll;
    @Column(nullable = false)
    private int todoCompleted;

    private Long fixedTodoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    public Bucket(String title, String imageUrl, User user) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.user = user;
    }

    @Builder
    public Bucket(String title, String imageUrl, String s3Key, String originalFileName,
        User user) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.s3Key = s3Key;
        this.originalFileName = originalFileName;
        this.user = user;
    }

    public Bucket update(String imageUrl, String s3Key, String originalFileName) {
        this.imageUrl = imageUrl;
        this.s3Key = s3Key;
        this.originalFileName = originalFileName;
        return this;
    }

    public Bucket update(String title, String imageUrl, String s3Key, String originalFileName) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.s3Key = s3Key;
        this.originalFileName = originalFileName;
        return this;
    }

    // 투두 개수 증가
    public void incrementTodoAll() {
        this.todoAll++;
    }

    // 투두 개수 감소
    public void decrementTodoAll() {
        if (this.todoAll > 0) {
            this.todoAll--;
        }
    }

    // 완료된 투두 개수 증가
    public void incrementTodoCompleted() {
        if (this.todoCompleted < this.todoAll) {
            this.todoCompleted++;
        }
    }

    // 완료된 투두 개수 감소
    public void decrementTodoCompleted() {
        if (this.todoCompleted > 0) {
            this.todoCompleted--;
        }
    }

    // 고정 투두 id값 저장
    public void updateFinalTodoId(Long todoId) {
        this.fixedTodoId = todoId;
    }

    // 투두 완료 여부에 따라 버킷 완료 상태 전환
    public void bucketCompleted(boolean completed) {
        this.checkCompleted = completed;
    }
}
