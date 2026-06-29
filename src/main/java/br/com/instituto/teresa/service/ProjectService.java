package br.com.instituto.teresa.service;

import br.com.instituto.teresa.domain.Project;
import br.com.instituto.teresa.domain.ProjectFeature;
import br.com.instituto.teresa.dto.ProjectFeatureDTO;
import br.com.instituto.teresa.dto.ProjectRequestDTO;
import br.com.instituto.teresa.dto.ProjectResponseDTO;
import br.com.instituto.teresa.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectResponseDTO> getAllProjects() {
        return projectRepository.findAll().stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public ProjectResponseDTO createProject(ProjectRequestDTO dto) {
        Project project = new Project();
        applyDto(project, dto);
        return mapToDTO(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponseDTO updateProject(long id, ProjectRequestDTO dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado com o ID: " + id));
        applyDto(project, dto);
        return mapToDTO(projectRepository.save(Objects.requireNonNull(project)));
    }

    @Transactional
    public void deleteProject(long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Projeto não encontrado com o ID: " + id);
        }
        projectRepository.deleteById(id);
    }

    private void applyDto(Project project, ProjectRequestDTO dto) {
        project.setCode(dto.code());
        project.setTitle(dto.title());
        project.setSubtitle(dto.subtitle());
        project.setDescription(dto.description());
        project.setImpact(dto.impact());
        project.setImage(dto.image());
        project.setVideoUrl(dto.videoUrl());

        if (dto.features() != null) {
            project.getFeatures().clear();
            List<ProjectFeature> features = dto.features().stream()
                    .map(f -> new ProjectFeature(f.icon(), f.text()))
                    .collect(Collectors.toList());
            project.getFeatures().addAll(features);
        }

        if (dto.details() != null) {
            project.getDetails().clear();
            project.getDetails().putAll(dto.details());
        }
    }

    private ProjectResponseDTO mapToDTO(Project project) {
        List<ProjectFeatureDTO> featureDTOs = project.getFeatures().stream()
            .map(f -> new ProjectFeatureDTO(f.getIcon(), f.getText()))
            .collect(Collectors.toList());

        return new ProjectResponseDTO(
            project.getId(),
            project.getCode(),
            project.getTitle(),
            project.getSubtitle(),
            project.getDescription(),
            project.getImpact(),
            project.getImage(),
            project.getVideoUrl(),
            featureDTOs,
            project.getDetails()
        );
    }
}
