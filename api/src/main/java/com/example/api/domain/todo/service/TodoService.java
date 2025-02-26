package com.example.api.domain.todo.service;

import com.example.api.domain.bucket.entity.Bucket;
import com.example.api.domain.bucket.repository.BucketRepository;
import com.example.api.domain.todo.dto.request.TodoRequestDto;
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
@Transactional(readOnly = true)
public class TodoService {

    private final BucketRepository bucketRepository;
    private final TodoRepository todoRepository;

    // 투두 생성 시 todoAll 증가
    @Transactional
    public TodoResponseDto createTodo(Long bucketId) {

        Bucket bucket = bucketRepository.findById(bucketId)
            .orElseThrow(() -> new ResourceNotFoundException("버킷을 찾을 수 없습니다"));

        Todo newTodo = todoRepository.save(new Todo("", bucket));

        bucket.incrementTodoAll();
        bucketRepository.save(bucket);

        return TodoResponseDto.from(newTodo);
    }

    public List<TodoResponseDto> findTodosByBucketId(Long id) {
        List<Todo> todos = todoRepository.findByBucketId(id);

        return todos.stream().map(TodoResponseDto::from).toList();
    }

    @Transactional
    public TodoResponseDto updateTodo(Long bucketId, Long todoId, TodoRequestDto requestDto) {

        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new ResourceNotFoundException("투두를 찾을 수 없습니다."));

        // 기존 완료 상태 저장 (변경 전 값 확인용)
        boolean wasCompleted = todo.isCompleted();

        todo.update(requestDto.getContent(), requestDto.isCompleted());
        todoRepository.save(todo);

        Bucket bucket = todo.getBucket();

        // 완료 상태가 변경되었을 경우에만 업데이트
        if (wasCompleted != requestDto.isCompleted()) {
            if (requestDto.isCompleted()) {
                bucket.incrementTodoCompleted();
            } else {
                bucket.decrementTodoCompleted();
            }
            bucketRepository.save(bucket);
        }

        return TodoResponseDto.from(todo);
    }

    @Transactional
    public void deleteTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new ResourceNotFoundException("투두를 찾을 수 없습니다"));

        Bucket bucket = todo.getBucket();

        bucket.decrementTodoAll();

        // 만약 삭제하려는 투두가 완료된 상태였다면 todoCompleted도 감소
        if (todo.isCompleted()) {
            bucket.decrementTodoCompleted();
        }

        // 투두 삭제 후 버킷 업데이트
        todoRepository.delete(todo);
        bucketRepository.save(bucket);
    }
}
