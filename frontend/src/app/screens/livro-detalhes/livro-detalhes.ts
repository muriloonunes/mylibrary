import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LivroService } from '../../services/livro-service/livro-service';
import { EmprestimoService } from '../../services/emprestimo-service/emprestimo-service';
import { LivroDetalhesModel, Status } from '../../models/livro.model';
import { EmprestimoExibicaoModel, StatusEmprestimo } from '../../models/emprestimo.model';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { DatePipe, NgClass } from '@angular/common';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-livro-detalhes',
  imports: [Button, Tag, TableModule, Skeleton, DatePipe, RouterLink, Toast, Tooltip, NgClass],
  providers: [MessageService],
  templateUrl: './livro-detalhes.html',
  styleUrl: './livro-detalhes.css',
})
export class LivroDetalhes implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private livroService = inject(LivroService);
  private emprestimoService = inject(EmprestimoService);
  private messageService = inject(MessageService);
  private cd = inject(ChangeDetectorRef);

  livroId!: number;
  livroDetalhes: LivroDetalhesModel | null = null;
  carregando = true;

  readonly statusLabels: Record<Status, string> = {
    DISPONIVEL: 'Disponível',
    EMPRESTADO: 'Emprestado',
  };

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.livroId = Number(idParam);
      this.carregarDetalhes();
    } else {
      this.voltar();
    }
  }

  private carregarDetalhes() {
    this.carregando = true;

    this.livroService.obterPorId(this.livroId).subscribe({
      next: (dados) => {
        this.livroDetalhes = dados;
        this.carregando = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.carregando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar detalhes do livro.',
        });
        console.error(err);
        this.voltar();
      },
    });
  }

  get emprestimoAtivo(): EmprestimoExibicaoModel | undefined {
    return this.livroDetalhes?.historicoEmprestimos.find((e) => e.status !== 'DEVOLVIDO');
  }

  devolverLivro() {
    const ativo = this.emprestimoAtivo;
    if (!ativo) return;

    this.emprestimoService.devolver(ativo.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Devolução registrada com sucesso!',
        });
        this.carregarDetalhes();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error?.message || 'Erro ao devolver livro.',
        });
      },
    });
  }

  excluirLivro() {
    this.livroService.apagarLivro(this.livroId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Deletado',
          detail: 'Livro excluído com sucesso.',
        });
        setTimeout(() => this.voltar(), 1000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error?.message || 'Erro ao excluir livro.',
        });
      },
    });
  }

  getSeverityTag(status: StatusEmprestimo): 'success' | 'warn' | 'danger' | 'info' | 'secondary' {
    switch (status) {
      case 'ATIVO':
        return 'info';
      case 'VENCE HOJE':
        return 'warn';
      case 'ATRASADO':
        return 'danger';
      case 'DEVOLVIDO':
        return 'success';
      default:
        return 'secondary';
    }
  }

  voltar() {
    this.router.navigate(['/livros']);
  }

  protected emprestarLivro(livroId: number) {
    this.router.navigate(['/emprestimos/novo'], {
      relativeTo: this.route,
      queryParams: { livroId: livroId.toString() },
    });
  }
}
