export type Status = 'DISPONIVEL' | 'EMPRESTADO';

export interface LivroModel {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  anoPublicacao: string;
  categoriaNome: string;
  status: Status;
}

export interface LivroCadastroModel {
  titulo: string;
  autor: string;
  isbn: string;
  anoPublicacao: number | null;
  categoriaId: number | null;
}
