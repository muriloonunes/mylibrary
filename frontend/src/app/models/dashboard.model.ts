import {EmprestimoExibicaoModel} from './emprestimo.model';

export interface DashboardResultados {
  totalLivros: number;
  livrosDisponiveis: number;
  livrosEmprestados: number;
  emprestimosAtivos: number;
  emprestimosRecentes: EmprestimoExibicaoModel[];
}
