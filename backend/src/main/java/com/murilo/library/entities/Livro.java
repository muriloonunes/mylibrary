package com.murilo.library.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 18/05/2026
 * @brief Class Livro
 */
@Entity
@Table(name = "livro")
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "O título não pode estar em branco")
    @Size(min = 1, max = 255)
    private String titulo;
    @NotBlank(message = "O autor não pode estar em branco")
    private String autor;
    @Pattern(regexp = "^([0-9]{10}|[0-9]{13})$", message = "O ISBN deve conter apenas números (10 ou 13 dígitos)")
    private String isbn;
    @PastOrPresent(message = "O ano de publicação não pode ser uma data futura")
    private Integer anoPublicacao;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    public Livro() {
    }

    public Livro(String titulo, String autor, String isbn, Integer anoPublicacao, Categoria categoria) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.anoPublicacao = anoPublicacao;
        this.status = Status.DISPONIVEL;
        this.categoria = categoria;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getIsbnFormatado() {
        String digits = isbn.replaceAll("\\D", "");

        if (digits.length() == 13) {
            return String.format("%s-%s-%s-%s-%s",
                    digits.substring(0, 3),
                    digits.charAt(3),
                    digits.substring(4, 9),
                    digits.substring(9, 12),
                    digits.substring(12));
        } else if (digits.length() == 10) {
            return String.format("%s-%s-%s-%s",
                    digits.charAt(0),
                    digits.substring(1, 4),
                    digits.substring(4, 9),
                    digits.substring(9));
        } else {
            return isbn;
        }
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getAnoPublicacao() {
        return anoPublicacao;
    }

    public void setAnoPublicacao(Integer anoPublicacao) {
        this.anoPublicacao = anoPublicacao;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}
