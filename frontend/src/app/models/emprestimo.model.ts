export type StatusEmprestimo = 'ATIVO' | 'ATRASADO' | 'DEVOLVIDO';

export interface EmprestimoCadastroModel {
  livroId: number | null;
  nomePessoa: string;
  telefone: string;
  dataEmprestimo: Date;
  dataPrevista: Date | null;
}

export interface EmprestimoExibicaoModel {
  id: number;
  livroTitulo: string;
  pessoaNome: string;
  telefone: string;
  dataEmprestimo: Date;
  dataPrevista: Date;
  dataDevolucao?: Date;
  status?: StatusEmprestimo;
}
