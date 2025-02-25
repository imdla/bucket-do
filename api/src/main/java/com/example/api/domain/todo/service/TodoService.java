package com.example.api.domain.todo.service;

import com.example.api.domain.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoService {

    private TodoRepository todoRepository;

}
