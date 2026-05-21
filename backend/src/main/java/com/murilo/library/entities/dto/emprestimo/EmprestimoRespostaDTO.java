package com.murilo.library.entities.dto.emprestimo;

import java.time.LocalDate;

public record EmprestimoRespostaDTO(
        Long id,
        String livroTitulo,
        String pessoaNome,
        String telefone,
        LocalDate dataEmprestimo,
        LocalDate dataPrevisa,
        LocalDate dataDevolucao
) {
}
