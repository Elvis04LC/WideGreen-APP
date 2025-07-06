import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaConteoService {
  private url = 'http://localhost:8080/api/categoria-conteo';

  constructor(private http: HttpClient) {}

  obtenerCantidadPorCategoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/cantidadPorCategoria`);
  }
}
