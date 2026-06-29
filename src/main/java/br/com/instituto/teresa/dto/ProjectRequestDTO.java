package br.com.instituto.teresa.dto;

import java.util.List;
import java.util.Map;
import jakarta.validation.constraints.NotBlank;

public record ProjectRequestDTO(
    String code,
    
    @NotBlank(message = "O título é obrigatório")
    String title,
    
    String subtitle,
    String description,
    String impact,
    String image,
    String videoUrl,
    List<ProjectFeatureDTO> features,
    Map<String, String> details
) {}
