package com.murilo.library.entities.dto.emprestimo;

import com.murilo.library.entities.Emprestimo;

import java.time.LocalDate;

public record EmprestimoRespostaDTO(
        Long id,
        String livroTitulo,
        String pessoaNome,
        String telefone,
        LocalDate dataEmprestimo,
        LocalDate dataPrevista,
        LocalDate dataDevolucao,
        String status
) {
    public EmprestimoRespostaDTO(Emprestimo emprestimo) {
        this(
                emprestimo.getId(),
                emprestimo.getLivro().getTitulo(),
                emprestimo.getNomePessoa(),
                emprestimo.getTelefoneFormatado(),
                emprestimo.getDataEmprestimo(),
                emprestimo.getDataDevolucaoPrevista(),
                emprestimo.getDataDevolucaoEfetiva(),
                calcularStatus(emprestimo)
        );
    }

    private static String calcularStatus(Emprestimo emprestimo) {
        if (emprestimo.getDataDevolucaoEfetiva() != null) {
            return "DEVOLVIDO";
        }
        if (emprestimo.getDataDevolucaoPrevista().isBefore(LocalDate.now())) {
            return "ATRASADO";
        }
        return "ATIVO";
    }
}
