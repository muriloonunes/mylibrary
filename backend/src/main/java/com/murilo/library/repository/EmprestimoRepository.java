package com.murilo.library.repository;

import com.murilo.library.entities.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 20/05/2026
 * @brief Interface EmprestimoRepository
 */

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
}
