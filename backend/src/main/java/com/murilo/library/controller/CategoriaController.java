package com.murilo.library.controller;

import com.murilo.library.entities.Categoria;
import com.murilo.library.entities.dto.CategoriaCadastroDTO;
import com.murilo.library.entities.dto.CategoriaRespostaDTO;
import com.murilo.library.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 18/05/2026
 * @brief Class CategoriaController
 */
@RequestMapping("api/categorias")
@RestController
public class CategoriaController {
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping
    public ResponseEntity<Categoria> criarCategoria(@Valid @RequestBody CategoriaCadastroDTO categoriaCadastroDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.criarCategoria(categoriaCadastroDTO));
    }

    @GetMapping
    public ResponseEntity<List<CategoriaRespostaDTO>> listar() {
        var categorias = categoriaService.listarCategorias();

        var dtos = categorias.stream().map(CategoriaRespostaDTO::new).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.encontrarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        categoriaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
