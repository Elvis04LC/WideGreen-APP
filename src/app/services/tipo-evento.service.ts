import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoEvento } from '../models/TipoEvento';


@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {
  private apiUrl = 'http://localhost:8080/api/tipo-evento';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  listarTipos(): Observable<TipoEvento[]> {
    return this.http.get<TipoEvento[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  registrarTipo(tipo: TipoEvento): Observable<TipoEvento> {
    return this.http.post<TipoEvento>(`${this.apiUrl}/registrar`, tipo, {
      headers: this.getAuthHeaders()
    });
  }
}
