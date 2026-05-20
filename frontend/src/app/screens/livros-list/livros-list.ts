import {ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {LivroService} from '../../services/livro-service/livro-service';
import {CategoriasService} from '../../services/categoria-service/categorias-service';
import {CategoriaModel} from '../../models/CategoriaModel';
import {LivroCadastroModel, LivroModel, Status} from '../../models/livro.model';
import {Tag} from 'primeng/tag';
import {Dialog} from 'primeng/dialog';
import {Tooltip} from 'primeng/tooltip';
import {FormsModule, NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {NgClass} from '@angular/common';
import {Select} from 'primeng/select';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-livros-list',
  imports: [Button, Tag, Tooltip, Dialog, FormsModule, NgClass, Select, InputNumber, InputText],
  templateUrl: './livros-list.html',
  styleUrl: './livros-list.css',
})
export class LivrosList implements OnInit {
  private livroService = inject(LivroService);
  private categoriaService = inject(CategoriasService);
  private cd = inject(ChangeDetectorRef);

  @ViewChild('criarLivroForm') criarLivroForm!: NgForm;

  livros: LivroModel[] = [];
  categorias: CategoriaModel[] = [];
  paginaAtual = 0;
  totalPaginas = 0;

  dialogoVisivel: boolean = false;
  livroCriado: LivroCadastroModel | undefined = undefined;
  erroBackend: string | null = null;
  anoAtual = new Date().getFullYear();

  readonly statusLabels: Record<Status, string> = {
    DISPONIVEL: 'Disponível',
    EMPRESTADO: 'Emprestado',
  };

  ngOnInit(): void {
    this.carregarLivros();
    this.carregarCategorias();
  }

  private carregarLivros() {
    this.livroService.obterLivros(this.paginaAtual, 10).subscribe({
      next: (dados) => {
        this.livros = dados.content;
        this.totalPaginas = dados.totalPages;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
      },
    });
  }

  salvarLivro() {
    if (this.livroCriado && this.criarLivroForm?.valid) {
      this.erroBackend = null;
      const dadosParaEnviar = {
        ...this.livroCriado,
        isbn: this.livroCriado.isbn.replace(/\D/g, ''),
      };
      this.livroService.criarLivro(dadosParaEnviar).subscribe({
        next: () => {
          this.carregarLivros();
          this.dialogoVisivel = false;
          this.cd.markForCheck();
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 400 && err.error?.message) {
            this.erroBackend = err.error.message;
          } else {
            this.erroBackend = 'Ocorreu um erro ao salvar o livro.';
          }
          this.cd.markForCheck();
        },
      });
    }
  }

  deletarLivro(livroId: number) {
    this.livroService.apagarLivro(livroId).subscribe({
      next: () => {
        this.livros = this.livros.filter(l => l.id !== livroId);
        this.cd.markForCheck();
      }, error: (err) => {
        console.log('Erro ao excluir o livro ', err)
      }
    })
  }

  private carregarCategorias() {
    this.categoriaService.obterCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
      },
    });
  }

  abrirDialogo() {
    this.dialogoVisivel = true;
    this.livroCriado = {
      titulo: '',
      autor: '',
      isbn: '',
      anoPublicacao: null,
      categoriaId: null,
    };
  }

  fecharDialogo() {
    this.dialogoVisivel = false;
    if (this.criarLivroForm) {
      this.criarLivroForm.resetForm();
    }
    this.livroCriado = undefined;
    this.erroBackend = null;
  }

  mudarPagina(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.carregarLivros();
  }

  formatarISBN(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = (input?.value || '').replace(/\D/g, '');

    if (valor.length > 13) {
      valor = valor.substring(0, 13);
    }

    if (valor.length <= 10) {
      valor = valor.replace(/^(\d{0,1})(\d{0,3})(\d{0,5})(\d{0,1}).*$/, (_, p1, p2, p3, p4) => {
        let res = '';
        if (p1) res += p1;
        if (p2) res += '-' + p2;
        if (p3) res += '-' + p3;
        if (p4) res += '-' + p4;
        return res;
      });
    } else {
      valor = valor.replace(
        /^(\d{0,3})(\d{0,1})(\d{0,5})(\d{0,3})(\d{0,1}).*$/,
        (_, p1, p2, p3, p4, p5) => {
          let res = '';
          if (p1) res += p1;
          if (p2) res += '-' + p2;
          if (p3) res += '-' + p3;
          if (p4) res += '-' + p4;
          if (p5) res += '-' + p5;
          return res;
        },
      );
    }

    if (!this.livroCriado) {
      this.livroCriado = {
        titulo: '',
        autor: '',
        isbn: '',
        anoPublicacao: null,
        categoriaId: null,
      };
    }
    this.livroCriado.isbn = valor;
  }
}
