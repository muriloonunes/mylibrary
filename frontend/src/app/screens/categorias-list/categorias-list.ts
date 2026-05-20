import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { CategoriasService } from '../../services/categoria-service/categorias-service';
import { CategoriaModel } from '../../models/CategoriaModel';
import { Dialog } from 'primeng/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Card } from 'primeng/card';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-categorias-list',
  imports: [Button, Dialog, FormsModule, InputText, NgClass, Card, Toast],
  providers: [MessageService],
  templateUrl: './categorias-list.html',
  styleUrl: './categorias-list.css',
})
export class CategoriasList implements OnInit {
  private service = inject(CategoriasService);
  private cd = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

  @ViewChild('criarCatForm') criarCatForm!: NgForm;
  categorias: CategoriaModel[] = [];
  categoriaCriada: CategoriaModel | undefined = undefined;
  dialogoVisivel: boolean = false;
  erroBackend: string | null = null;

  ngOnInit(): void {
    this.carregarCategorias();
  }

  private carregarCategorias() {
    this.service.obterCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.cd.markForCheck();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao carregar categorias: ${err}`,
        });
        console.error('Erro ao carregar categorias:', err);
      },
    });
  }

  salvarCategoria() {
    if (this.categoriaCriada && this.criarCatForm?.valid) {
      this.erroBackend = null;
      this.service.criarCategoria(this.categoriaCriada).subscribe({
        next: (novaCategoria) => {
          this.categorias.push(novaCategoria);
          this.dialogoVisivel = false;
          this.cd.markForCheck();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          if (err.status === 400 && err.error?.message) {
            this.erroBackend = err.error.message;
          } else {
            this.erroBackend = 'Ocorreu um erro ao salvar a categoria.';
          }
          this.cd.markForCheck();
        },
      });
    }
  }

  deletarCategoria(id: number | undefined) {
    if (id) {
      this.service.apagarCategoria(id).subscribe({
        next: () => {
          this.categorias = this.categorias.filter((c) => c.id !== id);
          this.messageService.add({
            severity: 'success',
            summary: 'Deletado',
            detail: 'Categoria deletada com sucesso',
          });
          this.cd.markForCheck();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err.error.message,
          });
          console.log('Erro ao apagar categoria ', err);
        },
      });
    }
  }

  abrirDialogo() {
    this.dialogoVisivel = true;
    this.categoriaCriada = { id: 0, nome: '', descricao: '' };
  }

  fecharDialogo() {
    this.dialogoVisivel = false;
    if (this.criarCatForm) {
      this.criarCatForm.resetForm();
    }
    this.categoriaCriada = undefined;
    this.erroBackend = null;
  }
}
