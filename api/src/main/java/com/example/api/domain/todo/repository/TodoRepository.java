package com.example.api.domain.todo.repository;

import com.example.api.domain.todo.entity.Todo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByBucketId(Long id);

    // 특정 버킷의 투두리스트 목록을 오름차순 정렬해서 리스트로 반환
    @Query("SELECT t FROM Todo t WHERE t.bucket.id = :id ORDER BY t.id ASC")
    List<Todo> findFirstByBucketId(@Param("id") Long id);
}
