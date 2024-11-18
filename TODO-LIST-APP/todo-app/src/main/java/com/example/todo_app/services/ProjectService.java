package com.example.todo_app.services;

import com.example.todo_app.models.Project;
import com.example.todo_app.models.User;
import com.example.todo_app.repositories.ProjectRepository;
import com.example.todo_app.repositories.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // Constructor for dependency injection
    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<Project> getProjectsByUser(Long userId) {
        return projectRepository.findByUserId(userId);
    }

    public Project createProject(Long userId, Project project) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            project.setUser(user.get());
            return projectRepository.save(project);
        }
        throw new RuntimeException("User not found");
    }

    public Project updateProject(Long id, Project project) {
        Project existingProject = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        existingProject.setTitle(project.getTitle());
        return projectRepository.save(existingProject);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
