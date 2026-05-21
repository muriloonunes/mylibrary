export type StatusEmprestimo = 'ATIVO' | 'ATRASADO' | 'DEVOLVIDO';

export interface EmprestimoExibicaoModel {
  id: number;
  livroTitulo: string;
  pessoaNome: string;
  telefone: string;
  dataEmprestimo: Date;
  dataPrevista: Date;
  dataDevolucao?: Date;
}
