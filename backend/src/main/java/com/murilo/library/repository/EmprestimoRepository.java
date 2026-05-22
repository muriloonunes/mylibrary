package com.murilo.library.repository;

import com.murilo.library.entities.Emprestimo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 20/05/2026
 * @brief Interface EmprestimoRepository
 */

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    Page<Emprestimo> findByDataDevolucaoEfetivaIsNotNull(Pageable pageable);

    @Query("SELECT e FROM Emprestimo e WHERE e.dataDevolucaoPrevista < :hoje AND e.dataDevolucaoEfetiva IS NULL")
    Page<Emprestimo> findAtrasados(LocalDate hoje, Pageable pageable);

    @Query("SELECT e FROM Emprestimo e WHERE e.dataDevolucaoPrevista >= :hoje AND e.dataDevolucaoEfetiva IS NULL")
    Page<Emprestimo> findAbertos(LocalDate hoje, Pageable pageable);

    @Query("SELECT COUNT(e) FROM Emprestimo e WHERE e.dataDevolucaoPrevista >= :hoje AND e.dataDevolucaoEfetiva IS NULL")
    long contarAbertos(LocalDate hoje);

    @Query("SELECT COUNT(e) FROm Emprestimo e WHERE e.dataDevolucaoPrevista < :hoje AND e.dataDevolucaoEfetiva IS NULL")
    long contarAtrasados(LocalDate hoje);
}
