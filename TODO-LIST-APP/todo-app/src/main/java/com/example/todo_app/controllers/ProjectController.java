package com.example.todo_app.controllers;

import com.example.todo_app.models.Project;
import com.example.todo_app.services.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    // Constructor for dependency injection
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/{userId}")
    public List<Project> getProjectsByUser(@PathVariable Long userId) {
        return projectService.getProjectsByUser(userId);
    }

    @PostMapping("/{userId}")
    public Project createProject(@PathVariable Long userId, @RequestBody Project project) {
        return projectService.createProject(userId, project);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project project) {
        return projectService.updateProject(id, project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
}
