import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoOrganizador } from '../models/EventoOrganizador';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventoOrganizadorService {
  private baseUrl = `${environment.apiUrl}/evento-organizador`;

  constructor(private http: HttpClient) {}

  registrar(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, data);
  }

listar(): Observable<EventoOrganizador[]> {
  return this.http.get<EventoOrganizador[]>(`${this.baseUrl}/listar`);
}
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`);
  }

  listarPorEvento(idEvento: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/por-evento/${idEvento}`);
  }
}
