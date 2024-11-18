package com.example.todo_app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity

public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private boolean status;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    @JsonBackReference
    private Project project;

    public Todo() {
        this.createdDate = LocalDateTime.now();
        this.status = false;
        this.updatedDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
