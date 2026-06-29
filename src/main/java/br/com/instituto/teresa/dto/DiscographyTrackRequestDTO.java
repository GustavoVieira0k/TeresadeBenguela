package br.com.instituto.teresa.dto;

import jakarta.validation.constraints.NotBlank;

public record DiscographyTrackRequestDTO(
    String code,
    @NotBlank(message = "O título é obrigatório")
    String title,
    String artist,
    @NotBlank(message = "O arquivo de áudio é obrigatório")
    String audioFile
) {}
