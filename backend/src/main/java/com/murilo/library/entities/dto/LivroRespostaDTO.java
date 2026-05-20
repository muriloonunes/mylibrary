package com.murilo.library.entities.dto;

import com.murilo.library.entities.Livro;
import com.murilo.library.entities.Status;

public record LivroRespostaDTO(
        Long id,
        String titulo,
        String autor,
        String isbn,
        String categoriaNome,
        Status status,
        String anoPublicacao
) {
    public LivroRespostaDTO(Livro livro) {
        this(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor(),
                livro.getIsbnFormatado(),
                livro.getCategoria().getNome(),
                livro.getStatus(),
                livro.getAnoPublicacao().toString()
        );
    }
}
