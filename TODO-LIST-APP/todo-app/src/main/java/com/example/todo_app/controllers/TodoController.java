package com.example.todo_app.controllers;

import com.example.todo_app.services.TodoService;
import com.example.todo_app.models.Todo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    // Constructor for dependency injection
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/{projectId}")
    public List<Todo> getTodosByProject(@PathVariable Long projectId) {
        return todoService.getTodosByProject(projectId);
    }

    @PostMapping("/{projectId}")
    public Todo createTodo(@PathVariable Long projectId, @RequestBody Todo todo) {
        return todoService.createTodo(projectId, todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        return todoService.updateTodo(id, todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodoById(id);
    }
}
