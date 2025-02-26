package com.example.api.domain.todo.service;

import com.example.api.domain.bucket.entity.Bucket;
import com.example.api.domain.bucket.repository.BucketRepository;
import com.example.api.domain.todo.dto.response.TodoResponseDto;
import com.example.api.domain.todo.entity.Todo;
import com.example.api.domain.todo.repository.TodoRepository;
import com.example.api.global.exception.ResourceNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final BucketRepository bucketRepository;
    private final TodoRepository todoRepository;


    //빈 버킷 생성
    @Transactional
    public TodoResponseDto createTodo(Long id) {
        Bucket bucket = bucketRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException());

        Todo emptyTodo = todoRepository.save(new Todo(null, bucket));
        return TodoResponseDto.from(emptyTodo);
    }


    public List<TodoResponseDto> findTodosByBucketId(Long id) {
        List<Todo> todos = todoRepository.findByBucketId(id);

        return todos.stream().map(TodoResponseDto::from).toList();
    }
}
