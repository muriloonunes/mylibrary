import { inject, Injectable } from '@angular/core';
import {LivroCadastroModel, LivroModel} from '../../models/livro.model';
import {Page} from '../../models/page.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/livros';

  obterLivros(page: number, size: number): Observable<Page<LivroModel>> {
    return this.http.get<Page<LivroModel>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  criarLivro(livro: LivroCadastroModel): Observable<LivroModel> {
    return this.http.post<LivroModel>(this.apiUrl, livro);
  }

  apagarLivro(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
