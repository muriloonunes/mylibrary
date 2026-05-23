package com.murilo.library.entities.dto.categoria;

import com.murilo.library.entities.Categoria;

public record CategoriaRespostaDTO(
        Long id,
        String nome,
        String descricao,
        int quantidadeLivros
) {
    public CategoriaRespostaDTO(Categoria categoria) {
        this(categoria.getId(),
                categoria.getNome(),
                categoria.getDescricao(),
                categoria.getLivros() != null ? categoria.getLivros().size() : 0
        );
    }
}
