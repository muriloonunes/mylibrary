import {inject, Injectable} from '@angular/core';
import {LivroCadastroModel, LivroModel} from '../../models/livro.model';
import {Page} from '../../models/page.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/livros';

  obterLivros(page: number, size: number, busca?: string, categoriaId?: number | null, status?: string | null): Observable<Page<LivroModel>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (busca && busca.trim() !== '') {
      params = params.set('busca', busca.trim());
    }
    if (categoriaId) {
      params = params.set('categoriaId', categoriaId);
    }
    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Page<LivroModel>>(this.apiUrl, {params});
  }

  criarLivro(livro: LivroCadastroModel): Observable<LivroModel> {
    return this.http.post<LivroModel>(this.apiUrl, livro);
  }

  apagarLivro(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
