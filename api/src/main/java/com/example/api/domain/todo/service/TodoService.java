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


    //빈 버킷 생성
    @Transactional
    public TodoResponseDto createTodo(Long id) {
        Bucket bucket = bucketRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("투두를 생성할 수 없습니다"));

        Todo emptyTodo = todoRepository.save(new Todo(null, bucket));
        return TodoResponseDto.from(emptyTodo);
    }


    public List<TodoResponseDto> findTodosByBucketId(Long id) {
        List<Todo> todos = todoRepository.findByBucketId(id);

        return todos.stream().map(TodoResponseDto::from).toList();
    }

    @Transactional
    public TodoResponseDto updateTodo(Long bucketId, Long todoId, TodoRequestDto requestDto) {
        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new ResourceNotFoundException("일치하는 투두를 찾을 수 없습니다."));

        todo.update(requestDto.getContent(), requestDto.isCompleted());

        todoRepository.save(todo);

        return TodoResponseDto.from(todo);
    }

    @Transactional
    public void deleteTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new ResourceNotFoundException("투두를 찾을 수 없습니다"));

        todoRepository.delete(todo);
    }
}
