import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {debounceTime, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-livros-list',
  imports: [Button, Tag, Tooltip, Dialog, FormsModule, NgClass, Select, InputNumber, InputText, IconField, InputIcon],
  templateUrl: './livros-list.html',
  styleUrl: './livros-list.css',
})
export class LivrosList implements OnInit, OnDestroy {
  private livroService = inject(LivroService);
  private categoriaService = inject(CategoriasService);
  private cd = inject(ChangeDetectorRef);

  @ViewChild('criarLivroForm') criarLivroForm!: NgForm;

  livros: LivroModel[] = [];
  categorias: CategoriaModel[] = [];
  paginaAtual = 0;
  totalPaginas = 0;

  dialogoVisivel = false;
  livroCriado: LivroCadastroModel | undefined = undefined;
  erroBackend: string | null = null;
  anoAtual = new Date().getFullYear();

  filtroLivros = '';
  filtroCategoria: number | null = null;
  filtroStatus: string | null = null;

  private buscaSubject = new Subject<void>();
  private buscaSubscription!: Subscription;

  readonly statusLabels: Record<Status, string> = {
    DISPONIVEL: 'Disponível',
    EMPRESTADO: 'Emprestado',
  };
  opcoesStatus = Object.entries(this.statusLabels).map(([value, label]) => ({label, value}));

  get temFiltroAtivo(): boolean {
    return this.filtroLivros.trim() !== '' || this.filtroCategoria !== null || this.filtroStatus !== null;
  }

  ngOnInit(): void {
    this.carregarLivros();
    this.carregarCategorias();

    this.buscaSubscription = this.buscaSubject.pipe(
      debounceTime(300),
    ).subscribe(() => {
      this.paginaAtual = 0;
      this.carregarLivros();
    });
  }

  ngOnDestroy(): void {
    this.buscaSubscription.unsubscribe();
  }

  private carregarLivros() {
    this.livroService.obterLivros(
      this.paginaAtual, 10, this.filtroLivros, this.filtroCategoria, this.filtroStatus
    ).subscribe({
      next: (dados) => {
        this.livros = dados.content;
        this.totalPaginas = dados.totalPages;
        this.cd.markForCheck();
      },
      error: (err) => console.error('Erro ao carregar livros:', err),
    });
  }

  private carregarCategorias() {
    this.categoriaService.obterCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.cd.markForCheck();
      },
      error: (err) => console.error('Erro ao carregar categorias:', err),
    });
  }

  salvarLivro() {
    if (!this.livroCriado || !this.criarLivroForm?.valid) return;

    this.erroBackend = null;
    const dadosParaEnviar = {
      ...this.livroCriado,
      isbn: this.livroCriado.isbn.replace(/\D/g, ''),
    };

    this.livroService.criarLivro(dadosParaEnviar).subscribe({
      next: () => {
        this.limparFiltros();
        this.carregarLivros();
        this.fecharDialogo();
      },
      error: (err: HttpErrorResponse) => {
        this.erroBackend = err.status === 400 && err.error?.message
          ? err.error.message
          : 'Ocorreu um erro ao salvar o livro.';
        this.cd.markForCheck();
      },
    });
  }

  deletarLivro(livroId: number) {
    this.livroService.apagarLivro(livroId).subscribe({
      next: () => {
        this.livros = this.livros.filter(l => l.id !== livroId);
        this.cd.markForCheck();
      },
      error: (err) => console.error('Erro ao excluir o livro ', err)
    });
  }

  protected filtrarLivros() {
    this.buscaSubject.next();
  }

  protected limparFiltros() {
    this.filtroLivros = '';
    this.filtroCategoria = null;
    this.filtroStatus = null;
    this.filtrarLivros();
  }

  abrirDialogo() {
    this.livroCriado = this.gerarLivroVazio();
    this.dialogoVisivel = true;
  }

  fecharDialogo() {
    this.dialogoVisivel = false;
    this.criarLivroForm?.resetForm();
    this.livroCriado = undefined;
    this.erroBackend = null;
  }

  mudarPagina(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.carregarLivros();
  }

  formatarISBN(event: any) {
    if (!this.livroCriado) return;

    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '').substring(0, 13);

    if (valor.length <= 10) {
      valor = valor.replace(/^(\d{1,3})?(\d{1,5})?(\d{1,4})?(\d)?$/,
        (_, p1, p2, p3, p4) => [p1, p2, p3, p4].filter(Boolean).join('-'));
    } else {
      valor = valor.replace(/^(\d{1,3})?(\d{1})?(\d{1,5})?(\d{1,3})?(\d)?$/,
        (_, p1, p2, p3, p4, p5) => [p1, p2, p3, p4, p5].filter(Boolean).join('-'));
    }

    this.livroCriado.isbn = valor;
  }

  private gerarLivroVazio(): LivroCadastroModel {
    return {titulo: '', autor: '', isbn: '', anoPublicacao: null, categoriaId: null};
  }
}
