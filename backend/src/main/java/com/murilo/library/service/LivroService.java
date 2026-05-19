package com.murilo.library.service;

import com.murilo.library.entities.Livro;
import com.murilo.library.entities.Status;
import com.murilo.library.entities.dto.LivroCadastroDTO;
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
        livro.setTitulo(livroDTO.titulo());
        livro.setAutor(livroDTO.autor());
        livro.setIsbn(livroDTO.isbn());
        livro.setAnoPublicacao(livroDTO.anoPublicacao());
        livro.setStatus(Status.DISPONIVEL);
        livro.setCategoria(categoria);
        categoria.adicionarLivro(livro);
        return livroRepository.save(livro);
    }

    public List<Livro> listarLivros() {
        return livroRepository.findAll();
    }

    public Page<Livro> listarLivros(Pageable pageable) {
        return livroRepository.findAll(pageable);
    }

    public Livro buscarPorId(Long id) {
        return livroRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Livro não encontrado")
        );
    }

    public void deletar(Long id) {
        livroRepository.deleteById(id);
    }
//
//    public boolean marcarComoIndisponivel(int id) {
//        Livro livro = livroRepository.buscarPorId(id);
//        if (livro == null || !livro.isStatusDisponivel()) {
//            return false;
//        }
//        livro.setStatusDisponivel(false);
//        return livroRepository.atualizar(livro);
//    }
//
//    public boolean marcarComoDisponivel(int id) {
//        Livro livro = livroRepository.buscarPorId(id);
//        if (livro == null || livro.isStatusDisponivel()) {
//            return false;
//        }
//        livro.setStatusDisponivel(true);
//        return livroRepository.atualizar(livro);
//    }
}
