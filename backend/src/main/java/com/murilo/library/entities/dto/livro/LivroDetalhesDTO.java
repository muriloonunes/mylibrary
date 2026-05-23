package com.murilo.library.entities.dto.livro;

import com.murilo.library.entities.Livro;
import com.murilo.library.entities.Status;
import com.murilo.library.entities.dto.emprestimo.EmprestimoRespostaDTO;

import java.util.List;

public record LivroDetalhesDTO(
        Long id,
        String titulo,
        String autor,
        String isbn,
        String categoriaNome,
        Status status,
        String anoPublicacao,
        List<EmprestimoRespostaDTO> historicoEmprestimos
) {
    public LivroDetalhesDTO(Livro livro) {
        this(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor(),
                livro.getIsbnFormatado(),
                livro.getCategoria().getNome(),
                livro.getStatus(),
                livro.getAnoPublicacao().toString(),
                livro.getEmprestimos().stream()
                        .map(EmprestimoRespostaDTO::new)
                        .toList()
        );
    }
}
