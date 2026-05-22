import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../models/page.model';
import { EmprestimoCadastroModel, EmprestimoExibicaoModel } from '../../models/emprestimo.model';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/emprestimos';

  obterEmprestimos(
    page: number,
    size: number,
    status: string | null,
  ): Observable<Page<EmprestimoExibicaoModel>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Page<EmprestimoExibicaoModel>>(this.apiUrl, { params });
  }

  criarEmprestimo(emprestimo: {
    livroId: number | null;
    nomePessoa: string;
    telefone: string;
    dataEmprestimo: string;
    dataPrevista: string;
  }): Observable<EmprestimoExibicaoModel> {
    return this.http.post<EmprestimoExibicaoModel>(this.apiUrl, emprestimo);
  }

  devolver(id: number): Observable<EmprestimoExibicaoModel> {
    return this.http.post<EmprestimoExibicaoModel>(`${this.apiUrl}/${id}/devolver`, {});
  }

  obterResumo(): Observable<{ todos: number; ativos: number; atrasados: number }> {
    return this.http.get<{ todos: number; ativos: number; atrasados: number }>(
      `${this.apiUrl}/resumo`,
    );
  }
}
