package com.murilo.library.controller;

import com.murilo.library.entities.Livro;
import com.murilo.library.entities.dto.LivroCadastroDTO;
import com.murilo.library.entities.dto.LivroRespostaDTO;
import com.murilo.library.service.LivroService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 18/05/2026
 * @brief Class LivroController
 */
@RestController
@RequestMapping("/api/livros")
public class LivroController {
    private final LivroService service;

    public LivroController(LivroService livroService) {
        this.service = livroService;
    }

    @PostMapping
    public ResponseEntity<LivroRespostaDTO> criar(@Valid @RequestBody LivroCadastroDTO livroDTO) {
        Livro novoLivro = service.cadastrarLivro(livroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(new LivroRespostaDTO(novoLivro));
    }

    @GetMapping
    public ResponseEntity<Page<LivroRespostaDTO>> listar(
            @PageableDefault(sort = "titulo") Pageable paginacao,
            @RequestParam(required = false) String busca
    ) {
        Page<LivroRespostaDTO> livros;

        if (busca != null && !busca.trim().isEmpty()) {
            livros = service.buscarLivros(paginacao, busca.trim()).map(LivroRespostaDTO::new);
        } else {
            livros = service.listarLivros(paginacao).map(LivroRespostaDTO::new);
        }

        return ResponseEntity.ok(livros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroRespostaDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(new LivroRespostaDTO(service.buscarPorId(id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
