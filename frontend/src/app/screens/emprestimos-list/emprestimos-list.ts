import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { MessageService } from 'primeng/api';
import { EmprestimoExibicaoModel, StatusEmprestimo } from '../../models/emprestimo.model';
import { Badge } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-emprestimos-list',
  imports: [Button, Toast, Tabs, TabList, Tab, Badge, TableModule, DatePipe, Tag],
  providers: [MessageService],
  templateUrl: './emprestimos-list.html',
  styleUrl: './emprestimos-list.css',
})
export class EmprestimosList implements OnInit {
  private messageService = inject(MessageService);
  private cd = inject(ChangeDetectorRef);

  emprestimos: EmprestimoExibicaoModel[] = [];

  abaAtiva: string = 'todos';

  ngOnInit(): void {
    this.carregarEmprestimos();
  }

  carregarEmprestimos() {
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 3);
    const semanaPassada = new Date(hoje);
    semanaPassada.setDate(semanaPassada.getDate() - 7);
    const mesPassado = new Date(hoje);
    mesPassado.setDate(mesPassado.getDate() - 20);

    this.emprestimos = [
      {
        id: 1,
        livroTitulo: 'O Senhor dos Anéis',
        pessoaNome: 'João Silva',
        telefone: '(11) 99999-1111',
        dataEmprestimo: semanaPassada,
        dataPrevista: ontem,
      }, // Atrasado
      {
        id: 2,
        livroTitulo: '1984',
        pessoaNome: 'Maria Souza',
        telefone: '(11) 98888-2222',
        dataEmprestimo: semanaPassada,
        dataPrevista: amanha,
      }, // Ativo
      {
        id: 3,
        livroTitulo: 'Dom Quixote',
        pessoaNome: 'Carlos Oliveira',
        telefone: '(11) 97777-3333',
        dataEmprestimo: mesPassado,
        dataPrevista: semanaPassada,
        dataDevolucao: hoje,
      }, // Devolvido
      {
        id: 4,
        livroTitulo: 'Clean Code',
        pessoaNome: 'Ana Costa',
        telefone: '(21) 96666-4444',
        dataEmprestimo: hoje,
        dataPrevista: amanha,
      }, // Ativo
      {
        id: 5,
        livroTitulo: 'A Revolução dos Bichos',
        pessoaNome: 'Pedro Santos',
        telefone: '(31) 95555-5555',
        dataEmprestimo: mesPassado,
        dataPrevista: ontem,
      }, // Atrasado
      {
        id: 6,
        livroTitulo: 'Design Patterns',
        pessoaNome: 'Lucas Almeida',
        telefone: '(41) 94444-6666',
        dataEmprestimo: hoje,
        dataPrevista: amanha,
      }, // Ativo
    ];
  }

  calcularStatus(emprestimo: EmprestimoExibicaoModel): StatusEmprestimo {
    if (emprestimo.dataDevolucao) {
      return 'DEVOLVIDO';
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const prevista = new Date(emprestimo.dataPrevista);
    prevista.setHours(0, 0, 0, 0);

    if (prevista < hoje) {
      return 'ATRASADO';
    }
    return 'ATIVO';
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

  get emprestimosFiltrados(): EmprestimoExibicaoModel[] {
    if (this.abaAtiva === 'abertos') {
      return this.emprestimos.filter((e) => this.calcularStatus(e) === 'ATIVO');
    } else if (this.abaAtiva === 'atrasados') {
      return this.emprestimos.filter((e) => this.calcularStatus(e) === 'ATRASADO');
    }
    return this.emprestimos;
  }

  get countTodos(): number {
    return this.emprestimos.length;
  }

  get countAbertos(): number {
    return this.emprestimos.filter((e) => this.calcularStatus(e) === 'ATIVO').length;
  }

  get countAtrasados(): number {
    return this.emprestimos.filter((e) => this.calcularStatus(e) === 'ATRASADO').length;
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
}
