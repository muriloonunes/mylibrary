package com.murilo.library.repository;

import com.murilo.library.entities.Livro;
import com.murilo.library.entities.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 18/05/2026
 * @brief Interface LivroRepository
 */
@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    boolean existsByIsbn(String isbn);

    @Query("SELECT l FROM Livro l WHERE " +
            "(:busca IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :busca, '%')) OR LOWER(l.autor) LIKE LOWER(CONCAT('%', :busca, '%'))) AND " +
            "(:categoriaId IS NULL OR l.categoria.id = :categoriaId) AND " +
            "(:status IS NULL OR l.status = :status)")
    Page<Livro> buscarComFiltros(
            @Param("busca") String busca,
            @Param("categoriaId") Long categoriaId,
            @Param("status") Status status,
            Pageable pageable
    );

    boolean existsByCategoriaId(Long categoriaId);

    boolean existsByIdAndStatus(Long id, Status status);

    Optional<List<Livro>> findByStatus(Status status);
}
