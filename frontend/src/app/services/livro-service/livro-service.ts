import { inject, Injectable } from '@angular/core';
import {LivroModel} from '../../models/livro.model';
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

  apagarLivro(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
