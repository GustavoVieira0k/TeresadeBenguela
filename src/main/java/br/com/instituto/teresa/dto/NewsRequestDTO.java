package br.com.instituto.teresa.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public record NewsRequestDTO(
    @NotBlank(message = "O título é obrigatório")
    String title,
    String summary,
    String content,
    String imageUrl,
    String videoUrl,
    LocalDate publishedAt,
    boolean active
) {}