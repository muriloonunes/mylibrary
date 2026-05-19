package com.murilo.library.entities.dto;

import jakarta.validation.constraints.*;

public record LivroCadastroDTO(
        @NotBlank(message = "O título é obrigatório")
        @Size(min = 1, max = 255)
        String titulo,

        @NotBlank(message = "O autor é obrigatório")
        @Size(min = 2, max = 100)
        String autor,

        @NotBlank(message = "O ISBN é obrigatório.")
        @Pattern(regexp = "^([0-9]{10}|[0-9]{13})$", message = "O ISBN deve conter apenas números (10 ou 13 dígitos)")
        String isbn,

        @NotNull(message = "O ano de publicação é obrigatório.")
        @PastOrPresent(message = "O ano de publicação não pode ser futuro")
        Integer anoPublicacao,

        @NotNull(message = "A categoria é obrigatória")
        Long categoriaId
) {
}
