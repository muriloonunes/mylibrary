package com.murilo.library.service;

import com.murilo.library.entities.Emprestimo;
import com.murilo.library.entities.Status;
import com.murilo.library.entities.dto.emprestimo.EmprestimoCadastroDTO;
import com.murilo.library.repository.EmprestimoRepository;
import com.murilo.library.repository.LivroRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 20/05/2026
 * @brief Class EmprestimoService
 */
@Service
public class EmprestimoService {
    private final EmprestimoRepository emprestimoRepository;
    private final LivroRepository livroRepository;

    public EmprestimoService(EmprestimoRepository emprestimoRepository, LivroRepository livroRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
    }

    @Transactional
    public Emprestimo cadastrarEmprestimo(EmprestimoCadastroDTO dto) {
        var livro = livroRepository.findById(dto.livroId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Livro não encontrado")
        );
        if (livroRepository.existsByIdAndStatus(dto.livroId(), Status.EMPRESTADO)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esse livro já está emprestado.");
        }
        if (dto.dataPrevista().isBefore(dto.dataEmprestimo())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A data de devolução prevista não pode ser antes da data do empréstimo.");
        }
        var emprestimo = new Emprestimo(
                dto.nomePessoa(),
                dto.telefone(),
                dto.dataEmprestimo(),
                dto.dataPrevista(),
                livro
        );
        livro.setStatus(Status.EMPRESTADO);
        livro.adicionarEmprestimo(emprestimo);
        return emprestimoRepository.save(emprestimo);
    }

    @Transactional
    public Emprestimo devolver(Long id) {
        var emprestimoExistente = encontrarPorId(id);

        if (emprestimoExistente.getDataDevolucaoEfetiva() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esse empréstimo já foi devolvido.");
        }

        emprestimoExistente.setDataDevolucaoEfetiva(LocalDate.now());
        emprestimoExistente.getLivro().setStatus(Status.DISPONIVEL);
        return emprestimoRepository.save(emprestimoExistente);
    }

    public Emprestimo encontrarPorId(Long id) {
        return emprestimoRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empréstimo não encontrado")
        );
    }

    public Page<Emprestimo> listar(Pageable pageable) {
        return emprestimoRepository.findAll(pageable);
    }

    public Page<Emprestimo> listarDevolvidos(Pageable pageable) {
        return emprestimoRepository.findByDataDevolucaoEfetivaIsNotNull(pageable);
    }

    public Page<Emprestimo> listarAtrasados(Pageable pageable) {
        var hoje = LocalDate.now();
        return emprestimoRepository.findAtrasados(hoje, pageable);
    }

    public Page<Emprestimo> listarAbertos(Pageable pageable) {
        var hoje = LocalDate.now();
        return emprestimoRepository.findAbertos(hoje, pageable);
    }

    public long contar() {
        return emprestimoRepository.count();
    }

    public long contarAtrasados() {
        var hoje = LocalDate.now();
        return emprestimoRepository.contarAtrasados(hoje);
    }

    public long contarAbertos() {
        var hoje = LocalDate.now();
        return emprestimoRepository.contarAbertos(hoje);
    }
}
