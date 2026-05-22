package com.murilo.library.controller;

import com.murilo.library.entities.dto.emprestimo.EmprestimoCadastroDTO;
import com.murilo.library.entities.dto.emprestimo.EmprestimoRespostaDTO;
import com.murilo.library.service.EmprestimoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    public ResponseEntity<EmprestimoRespostaDTO> criar(@Valid @RequestBody EmprestimoCadastroDTO emprestimo) {
        EmprestimoRespostaDTO resposta = new EmprestimoRespostaDTO(emprestimoService.cadastrarEmprestimo(emprestimo));
        return ResponseEntity.ok(resposta);
    }

    @GetMapping
    public ResponseEntity<Page<EmprestimoRespostaDTO>> listar(
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable paginacao,
            @RequestParam(required = false) String status
    ) {
        IO.println("Status recebido: " + status);
        Page<EmprestimoRespostaDTO> emprestimos;
        if ("DEVOLVIDOS".equalsIgnoreCase(status)) {
            emprestimos = emprestimoService.listarDevolvidos(paginacao).map(EmprestimoRespostaDTO::new);
        } else if ("ATRASADOS".equalsIgnoreCase(status)) {
            emprestimos = emprestimoService.listarAtrasados(paginacao).map(EmprestimoRespostaDTO::new);
        } else if ("ABERTOS".equalsIgnoreCase(status)) {
            emprestimos = emprestimoService.listarAbertos(paginacao).map(EmprestimoRespostaDTO::new);
        } else {
            emprestimos = emprestimoService.listar(paginacao).map(EmprestimoRespostaDTO::new);
        }
        return ResponseEntity.ok(emprestimos);
    }

    @GetMapping("/resumo")
    public ResponseEntity<Map<String, Long>> obterResumoEmprestimos() {
        long totalTodos = emprestimoService.contar();
        long totalAtivos = emprestimoService.contarAbertos();
        long totalAtrasados = emprestimoService.contarAtrasados();

        Map<String, Long> resumo = Map.of(
                "todos", totalTodos,
                "ativos", totalAtivos,
                "atrasados", totalAtrasados
        );

        return ResponseEntity.ok(resumo);
    }
}
