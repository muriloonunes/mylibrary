package com.murilo.library.entities.dto.emprestimo;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record EmprestimoCadastroDTO(
        @NotNull(message = "O ID do livro é obrigatório.")
        Long livroId,

        @NotBlank(message = "O nome da pessoa é obrigatório.")
        @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres.")
        String nomePessoa,

        @NotBlank(message = "O telefone é obrigatório.")
        @Pattern(
                regexp = "^\\d{2}9\\d{8}$",
                message = "O telefone deve seguir o padrão (XX) 9XXXX-XXXX"
        )
        String telefone,

        @NotNull(message = "A data do empréstimo é obrigatória.")
        @PastOrPresent(message = "A data do empréstimo não pode ser uma data futura.")
        LocalDate dataEmprestimo,

        @NotNull(message = "A data de devolução prevista é obrigatória.")
        @FutureOrPresent(message = "A data de devolução prevista deve ser hoje ou uma data futura.")
        LocalDate dataPrevista
) {
}
