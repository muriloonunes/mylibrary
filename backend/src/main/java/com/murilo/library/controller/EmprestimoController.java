package com.murilo.library.controller;

import com.murilo.library.entities.dto.emprestimo.EmprestimoCadastroDTO;
import com.murilo.library.entities.dto.emprestimo.EmprestimoRespostaDTO;
import com.murilo.library.service.EmprestimoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 21/05/2026
 * @brief Class EmprestimoController
 */
@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {
    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @PostMapping
    public ResponseEntity<Void> criarEmprestimo(@Valid @RequestBody EmprestimoCadastroDTO emprestimo) {
        EmprestimoRespostaDTO resposta = new EmprestimoRespostaDTO(emprestimoService.cadastrarEmprestimo(emprestimo));
        return ResponseEntity.ok().build();
    }
}
