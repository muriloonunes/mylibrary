package com.murilo.library.entities.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoriaDTO(
        @NotBlank(message = "O nome não pode estar em branco")
        String nome,
        String descricao
) {
}
