package br.com.instituto.teresa.dto;

import java.util.List;
import java.util.Map;

public record ProjectResponseDTO(
    Long id,
    String code,
    String title,
    String subtitle,
    String description,
    String impact,
    String image,
    String videoUrl,
    List<ProjectFeatureDTO> features,
    Map<String, String> details
) {}
