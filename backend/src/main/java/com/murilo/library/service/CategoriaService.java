package com.murilo.library.service;

import com.murilo.library.entities.Categoria;
import com.murilo.library.entities.dto.CategoriaCadastroDTO;
import com.murilo.library.repository.CategoriaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 18/05/2026
 * @brief Class CategoriaService
 */

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria criarCategoria(CategoriaCadastroDTO categoriaCadastroDTO) {
        if (encontrarPorNome(categoriaCadastroDTO.nome()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe uma categoria com este nome.");
        }
        Categoria categoria = new Categoria();
        categoria.setNome(categoriaCadastroDTO.nome());
        categoria.setDescricao(categoriaCadastroDTO.descricao());
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    public Categoria encontrarPorNome(String nome) {
        return categoriaRepository.findByNome(nome).orElse(null);
    }

    public Categoria encontrarPorId(Long id) {
        return categoriaRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada")
        );
    }

    public void deletar(Long id) {
        categoriaRepository.deleteById(id);
    }
}
