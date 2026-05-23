import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoriaModel} from '../../models/categoria.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/categorias';

  obterCategorias(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(`${this.apiUrl}`);
  }

  criarCategoria(categoria: CategoriaModel): Observable<CategoriaModel> {
    return this.http.post<CategoriaModel>(`${this.apiUrl}`, categoria);
  }

  apagarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
