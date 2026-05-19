package com.murilo.library.repository;

import com.murilo.library.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 18/05/2026
 * @brief Interface CategoriaRepository
 */

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNome(String nome);
}
