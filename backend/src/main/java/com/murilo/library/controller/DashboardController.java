package com.murilo.library.controller;

import com.murilo.library.entities.Status;
import com.murilo.library.entities.dto.DashboardDTO;
import com.murilo.library.entities.dto.emprestimo.EmprestimoRespostaDTO;
import com.murilo.library.service.EmprestimoService;
import com.murilo.library.service.LivroService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 22/05/2026
 * @brief Class DashboardController
 */
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final LivroService livroService;
    private final EmprestimoService emprestimoService;

    public DashboardController(LivroService livroService, EmprestimoService emprestimoService) {
        this.livroService = livroService;
        this.emprestimoService = emprestimoService;
    }

    @GetMapping
    public DashboardDTO obterDashboard() {
        var totalLivros = livroService.contar();
        var livrosDisponiveis = livroService.contarPorStatus(Status.DISPONIVEL);
        var livrosEmprestados = livroService.contarPorStatus(Status.EMPRESTADO);
        var emprestimosAtivos = emprestimoService.contarAbertos();
        var emprestimosRecentes = emprestimoService.listarRecentes().stream().map(EmprestimoRespostaDTO::new).toList();
        return new DashboardDTO(
                totalLivros,
                livrosDisponiveis,
                livrosEmprestados,
                emprestimosAtivos,
                emprestimosRecentes
        );
    }
}
