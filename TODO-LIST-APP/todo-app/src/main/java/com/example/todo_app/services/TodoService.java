package com.example.todo_app.services;

import com.example.todo_app.models.Project;
import com.example.todo_app.models.Todo;
import com.example.todo_app.repositories.ProjectRepository;
import com.example.todo_app.repositories.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    private final TodoRepository todoRepository;
    private final ProjectRepository projectRepository;

    // Constructor for dependency injection
    public TodoService(TodoRepository todoRepository, ProjectRepository projectRepository) {
        this.todoRepository = todoRepository;
        this.projectRepository = projectRepository;
    }

    public List<Todo> getTodosByProject(Long projectId) {
        return todoRepository.findAllByProjectId(projectId);
    }

    public Todo createTodo(Long projectId, Todo todo) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        todo.setProject(project);
        todo.setUpdatedDate(java.time.LocalDateTime.now());  // Set updatedDate when creating a new todo
        todo.setUpdatedDate(java.time.LocalDateTime.now());
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo todo) {
        Todo existingTodo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
        existingTodo.setDescription(todo.getDescription());
        existingTodo.setStatus(todo.isStatus());
        existingTodo.setUpdatedDate(java.time.LocalDateTime.now());
        return todoRepository.save(existingTodo);
    }

    public void deleteTodoById(Long id) {
        todoRepository.deleteById(id);
    }
}
