package com.murilo.library.entities.dto.emprestimo;

import com.murilo.library.entities.Emprestimo;

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
    public EmprestimoRespostaDTO(Emprestimo emprestimo) {
        this(
                emprestimo.getId(),
                emprestimo.getLivro().getTitulo(),
                emprestimo.getNomePessoa(),
                emprestimo.getTelefone(),
                emprestimo.getDataEmprestimo(),
                emprestimo.getDataDevolucaoPrevista(),
                emprestimo.getDataDevolucaoEfetiva()
        );
    }
}
