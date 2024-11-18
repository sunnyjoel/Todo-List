package com.example.todo_app.repositories;

import com.example.todo_app.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ProjectRepository extends JpaRepository<Project, Long>{
    List<Project> findByUserId(Long userId); // Derived query method
}
