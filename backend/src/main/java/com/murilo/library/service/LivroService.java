package com.murilo.library.service;

import com.murilo.library.entities.Livro;
import com.murilo.library.entities.Status;
import com.murilo.library.entities.dto.livro.LivroCadastroDTO;
import com.murilo.library.repository.CategoriaRepository;
import com.murilo.library.repository.LivroRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 18/05/2026
 * @brief Class LivroService
 */
@Service
public class LivroService {
    private final CategoriaRepository categoriaRepository;
    private final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository, CategoriaRepository categoriaRepository) {
        this.livroRepository = livroRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public Livro cadastrarLivro(LivroCadastroDTO livroDTO) {
        if (livroRepository.existsByIsbn(livroDTO.isbn())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe um livro com esse ISBN");
        }
        var categoria = categoriaRepository.findById(livroDTO.categoriaId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada")
        );
        Livro livro = new Livro(
                livroDTO.titulo(),
                livroDTO.autor(),
                livroDTO.isbn(),
                livroDTO.anoPublicacao(),
                categoria
        );
        categoria.adicionarLivro(livro);
        return livroRepository.save(livro);
    }

    public List<Livro> listarLivros() {
        return livroRepository.findAll();
    }

    public Page<Livro> listarLivros(Pageable pageable) {
        return livroRepository.findAll(pageable);
    }

    public Page<Livro> buscarLivros(Pageable pageable, String busca, Long categoriaId, Status status) {
        return livroRepository.buscarComFiltros(busca, categoriaId, status, pageable);
    }

    public List<Livro> buscarLivrosDisponiveis() {
        return livroRepository.findByStatus(Status.DISPONIVEL).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Não há livros disponíveis")
        );
    }

    public Livro buscarPorId(Long id) {
        return livroRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Livro não encontrado")
        );
    }

    public void deletar(Long id) {
        if (!livroRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Livro não encontrado");
        }
        if (livroRepository.existsByIdAndStatus(id, Status.EMPRESTADO)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível deletar um livro emprestado");
        }
        livroRepository.deleteById(id);
    }
}
