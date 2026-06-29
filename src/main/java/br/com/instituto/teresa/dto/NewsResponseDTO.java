package br.com.instituto.teresa.dto;

import java.time.LocalDate;

public record NewsResponseDTO(
    Long id,
    String title,
    String summary,
    String content,
    String imageUrl,
    String videoUrl,
    LocalDate publishedAt,
    boolean active
) {}