package com.murilo.library.entities.dto.categoria;

import jakarta.validation.constraints.NotBlank;

public record CategoriaCadastroDTO(
        @NotBlank(message = "O nome não pode estar em branco")
        String nome,
        String descricao
) {
}
