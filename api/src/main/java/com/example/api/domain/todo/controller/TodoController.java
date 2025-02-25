package com.example.api.domain.todo.controller;

import com.example.api.domain.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/buckets")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;


}
