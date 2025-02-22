package com.example.api.domain.bucket.entity;

import com.example.api.global.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private Long id;

    @Column(length = 20)
    private String title;
    private LocalDateTime deadline;
    private String image_path;
    private boolean is_completed;

    @Column(nullable = false)
    private Integer todo_all;
    @Column(nullable = false)
    private Integer todo_completed;

    @Builder
    public Bucket(String title, String image_path, boolean is_completed, Integer todo_all,
        Integer todo_completed) {
        this.title = title;
        this.image_path = image_path;
        this.is_completed = is_completed;
        this.todo_all = todo_all;
        this.todo_completed = todo_completed;
    }
}
