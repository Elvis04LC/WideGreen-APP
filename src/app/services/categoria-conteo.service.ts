import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriaConteoService {
  private url = `${environment.apiUrl}/categoria-conteo`;

  constructor(private http: HttpClient) {}

  obtenerCantidadPorCategoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/cantidadPorCategoria`);
  }
}
