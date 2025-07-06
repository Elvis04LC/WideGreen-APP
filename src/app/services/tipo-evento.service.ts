import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoEvento } from '../models/TipoEvento';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {
  private apiUrl = `${environment.apiUrl}/tipo-evento`;

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
