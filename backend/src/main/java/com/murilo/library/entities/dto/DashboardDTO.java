package com.murilo.library.entities.dto;

import com.murilo.library.entities.dto.emprestimo.EmprestimoRespostaDTO;

import java.util.List;

public record DashboardDTO(
        Long totalLivros,
        Long livrosDisponiveis,
        Long livrosEmprestados,
        Long emprestimosAtivos,
        List<EmprestimoRespostaDTO> emprestimosRecentes
) {
}
