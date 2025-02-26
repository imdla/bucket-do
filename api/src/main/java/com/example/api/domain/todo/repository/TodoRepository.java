package com.example.api.domain.todo.repository;

import com.example.api.domain.todo.entity.Todo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByBucketId(Long id);
}
