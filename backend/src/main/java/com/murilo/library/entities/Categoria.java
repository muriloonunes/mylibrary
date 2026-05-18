package com.murilo.library.entities;

import jakarta.persistence.*;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 18/05/2026
 * @brief Class Categoria
 */
@Entity(name = "categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true, nullable = false)
    private String nome;
    private String descricao;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
