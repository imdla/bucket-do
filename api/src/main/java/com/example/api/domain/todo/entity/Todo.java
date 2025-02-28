package com.example.api.domain.todo.entity;

import com.example.api.domain.bucket.entity.Bucket;
import com.example.api.global.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucket_id", nullable = false)
    private Bucket bucket;

    private String content;

    @Column(nullable = false)
    private boolean isCompleted;

    @Builder
    public Todo(String content, Bucket bucket) {
        this.bucket = bucket;
        this.content = content;
    }

    public Todo update(String content, boolean isCompleted) {
        this.content = content;
        this.isCompleted = isCompleted;
        return this;
    }

    // content가 필요할 때만 수정
    public void updateContentIfNeeded(String newContent) {
        if (newContent != null && !newContent.trim().isEmpty()) {
            this.content = newContent;  // 새로운 내용으로 업데이트
        }
    }

    // 완료 상태만 업데이트
    public void updateCompletStatus(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
