package com.portfolio.service;

import com.portfolio.entity.Project;
import com.portfolio.entity.User;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project add(Long userId, Project project) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        project.setUser(user);
        return projectRepository.save(project);
    }

    public List<Project> getByUser(Long userId) {
        return projectRepository.findByUserId(userId);
    }

    public Project update(Long id, Project updated) {
        Project p = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        p.setTitle(updated.getTitle());
        p.setDescription(updated.getDescription());
        p.setTechStack(updated.getTechStack());
        p.setGithubLink(updated.getGithubLink());
        return projectRepository.save(p);
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }
}
