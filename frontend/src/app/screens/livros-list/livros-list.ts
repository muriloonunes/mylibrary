import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { LivroService } from '../../services/livro-service/livro-service';
import { LivroModel, Status } from '../../models/livro.model';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-livros-list',
  imports: [Button, Tag, Tooltip],
  templateUrl: './livros-list.html',
  styleUrl: './livros-list.css',
})
export class LivrosList implements OnInit {
  private service = inject(LivroService);
  private cd = inject(ChangeDetectorRef);

  livros: LivroModel[] = [];
  paginaAtual = 0;
  totalPaginas = 0;

  readonly statusLabels: Record<Status, string> = {
    DISPONIVEL: 'Disponível',
    EMPRESTADO: 'Emprestado'
  };

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros() {
    this.service.obterLivros(this.paginaAtual, 10).subscribe({
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

  mudarPagina(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.carregarLivros();
  }
}
