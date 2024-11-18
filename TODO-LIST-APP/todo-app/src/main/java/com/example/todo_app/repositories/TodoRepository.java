package com.example.todo_app.repositories;

import com.example.todo_app.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface TodoRepository extends JpaRepository<Todo, Long>  {
    List<Todo> findAllByProjectId(Long projectId); // Derived query method
}
