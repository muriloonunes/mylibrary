import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { MessageService } from 'primeng/api';
import { EmprestimoExibicaoModel, StatusEmprestimo } from '../../models/emprestimo.model';
import { Badge } from 'primeng/badge';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Tag } from 'primeng/tag';
import { Router } from '@angular/router';
import { EmprestimoService } from '../../services/emprestimo-service/emprestimo-service';

@Component({
  selector: 'app-emprestimos-list',
  imports: [Button, Toast, Tabs, TabList, Tab, Badge, TableModule, DatePipe, Tag],
  providers: [MessageService],
  templateUrl: './emprestimos-list.html',
  styleUrl: './emprestimos-list.css',
})
export class EmprestimosList implements OnInit {
  private router = inject(Router);
  private emprestimoService = inject(EmprestimoService);
  private messageService = inject(MessageService);
  private cd = inject(ChangeDetectorRef);

  emprestimos: EmprestimoExibicaoModel[] = [];
  abaAtiva: string = 'todos';

  paginaAtual = 0;
  tamanhoPagina = 10;
  totalElementos = 0;
  estaCarregando = true;
  carregamentoInicialConcluido = true;

  totalEmprestimos = 0;
  totalAtivos = 0;
  totalAtrasados = 0;

  ngOnInit() {
    this.carregarResumo();
    this.carregarEmprestimos();
  }

  carregarTabela(event: TableLazyLoadEvent) {
    if (!this.carregamentoInicialConcluido) return;

    this.estaCarregando = true;
    const first = event.first ?? 0;
    const rows = event.rows ?? this.tamanhoPagina;
    this.paginaAtual = Math.floor(first / rows);
    this.tamanhoPagina = rows;

    this.carregarEmprestimos();
  }

  protected aoAlterarAba(novaAba: string | undefined | number) {
    if (typeof novaAba === 'string') {
      this.paginaAtual = 0;
      this.carregarEmprestimos();
    }
  }

  private carregarEmprestimos() {
    this.estaCarregando = true;
    const statusFiltro = this.abaAtiva === 'TODOS' ? null : this.abaAtiva;

    this.emprestimoService
      .obterEmprestimos(this.paginaAtual, this.tamanhoPagina, statusFiltro)
      .subscribe({
        next: (dados) => {
          this.emprestimos = dados.content;
          this.totalElementos = dados.page.totalElements;

          this.estaCarregando = false;
          this.carregamentoInicialConcluido = true;

          this.cd.markForCheck();
        },
        error: (err) => {
          this.estaCarregando = false;
          this.carregamentoInicialConcluido = true;

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao carregar empréstimos: ${err.name}`,
          });
          console.error('Erro ao carregar empréstimos:', err);
        },
      });
  }

  devolver(emprestimo: EmprestimoExibicaoModel) {
    emprestimo.dataDevolucao = new Date();
    this.messageService.add({
      severity: 'success',
      summary: 'Devolvido',
      detail: `O livro "${emprestimo.livroTitulo}" foi devolvido com sucesso.`,
    });
    this.cd.markForCheck();
  }

  private carregarResumo() {
    this.emprestimoService.obterResumo().subscribe({
      next: (resumo) => {
        this.totalEmprestimos = resumo.todos;
        this.totalAtivos = resumo.ativos;
        this.totalAtrasados = resumo.atrasados;
        this.cd.markForCheck();
      },
      error: (err) => console.error('Erro ao carregar resumo', err),
    });
  }

  getSeverityTag(status: StatusEmprestimo): 'success' | 'warn' | 'danger' | 'info' | 'secondary' {
    switch (status) {
      case 'ATIVO':
        return 'info';
      case 'ATRASADO':
        return 'danger';
      case 'DEVOLVIDO':
        return 'success';
      default:
        return 'secondary';
    }
  }

  protected novoEmprestimo() {
    this.router.navigate(['/emprestimos/novo']);
  }
}
