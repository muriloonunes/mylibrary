import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DashboardResultados} from '../../models/dashboard.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/dashboard';

  obterDados(): Observable<DashboardResultados> {
    return this.http.get<DashboardResultados>(`${this.apiUrl}`)
  }
}
