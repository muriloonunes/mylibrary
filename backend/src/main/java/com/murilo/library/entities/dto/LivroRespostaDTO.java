package com.murilo.library.entities.dto;

import com.murilo.library.entities.Livro;

public record LivroRespostaDTO(
        Long id,
        String titulo,
        String autor,
        String isbn,
        String categoriaNome,
        String status,
        String anoPublicacao
) {
    public LivroRespostaDTO(Livro livro) {
        this(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor(),
                livro.getIsbnFormatado(),
                livro.getCategoria().getNome(),
                livro.getStatus().toString(),
                livro.getAnoPublicacao().toString()
        );
    }
}
