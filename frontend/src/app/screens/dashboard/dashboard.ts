import {Component, inject, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard-service/dashboard-service';
import {DashboardResultados} from '../../models/dashboard.model';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {StatusEmprestimo} from '../../models/emprestimo.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    Toast
  ],
  providers: [MessageService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private service = inject(DashboardService);
  private messageService = inject(MessageService);

  dadosDashboard: DashboardResultados | null = null;
  carregando = true;

  ngOnInit(): void {
    this.carregarDadosDashboard();
  }

  private carregarDadosDashboard() {
    this.service.obterDados().subscribe({
      next: (dados) => {
        this.dadosDashboard = dados;
        this.carregando = false;
      },
      error: (err) => {
        this.carregando = false;
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao carregar dados do dashboard: ${err.name}`,
          }
        )
        console.error('Erro ao carregar dados do dashboard:', err);
      },
    })
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
}
