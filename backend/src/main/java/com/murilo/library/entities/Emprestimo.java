package com.murilo.library.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

/**
 *
 * @author Murilo Nunes <murilo_no@outlook.com>
 * @date 20/05/2026
 * @brief Class Emprestimo
 */
@Entity
@Table(name = "emprestimos")
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "O nome da pessoa não pode estar em branco")
    @Size(min = 3, max = 255, message = "O nome da pessoa deve conter entre 3 e 255 caracteres")
    private String nomePessoa;
    @Pattern(
            regexp = "^\\d{2}9\\d{8}$",
            message = "O telefone deve seguir o padrão (XX) 9XXXX-XXXX"
    )
    private String telefone;
    @NotNull(message = "A data do empréstimo é obrigatória.")
    @PastOrPresent(message = "A data do empréstimo não pode ser uma data futura.")
    private LocalDate dataEmprestimo;
    @NotNull(message = "A data de devolução prevista é obrigatória.")
    @FutureOrPresent(message = "A data de devolução prevista deve ser hoje ou uma data futura.")
    private LocalDate dataDevolucaoPrevista;
    @PastOrPresent(message = "A data de devolução efetiva não pode ser uma data futura.")
    private LocalDate dataDevolucaoEfetiva;
    @NotNull(message = "O livro do empréstimo deve ser informado.")
    @ManyToOne
    @JoinColumn(name = "livro_id")
    @JsonManagedReference
    private Livro livro;

    public Emprestimo() {
    }

    public Emprestimo(String nomePessoa, String telefone, LocalDate dataEmprestimo, LocalDate dataDevolucaoPrevista, Livro livro) {
        this.nomePessoa = nomePessoa;
        this.telefone = telefone;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
        this.livro = livro;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getNomePessoa() {
        return nomePessoa;
    }

    public void setNomePessoa(String nomePessoa) {
        this.nomePessoa = nomePessoa;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getTelefoneFormatado() {
        return this.telefone.replaceAll("(\\d{2})(\\d)(\\d{4})(\\d{4})", "($1) $2$3-$4");
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public LocalDate getDataDevolucaoPrevista() {
        return dataDevolucaoPrevista;
    }

    public void setDataDevolucaoPrevista(LocalDate dataDevolucaoPrevista) {
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
    }

    public LocalDate getDataDevolucaoEfetiva() {
        return dataDevolucaoEfetiva;
    }

    public void setDataDevolucaoEfetiva(LocalDate dataDevolucaoEfetiva) {
        this.dataDevolucaoEfetiva = dataDevolucaoEfetiva;
    }

    public Livro getLivro() {
        return livro;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }
}
