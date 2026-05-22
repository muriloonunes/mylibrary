package com.murilo.library.controller;

import com.murilo.library.entities.Livro;
import com.murilo.library.entities.Status;
import com.murilo.library.entities.dto.livro.LivroCadastroDTO;
import com.murilo.library.entities.dto.livro.LivroRespostaDTO;
import com.murilo.library.service.LivroService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable paginacao,
            @RequestParam(required = false) String busca,
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) Status status
    ) {
        Page<LivroRespostaDTO> livros = service.buscarLivros(paginacao, busca, categoriaId, status).map(LivroRespostaDTO::new);
        return ResponseEntity.ok(livros);
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<List<LivroRespostaDTO>> listarDisponiveis() {
        return ResponseEntity.ok(service.buscarLivrosDisponiveis().stream().map(LivroRespostaDTO::new).toList());
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
