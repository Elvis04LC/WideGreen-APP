import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Eventos';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  crearEvento(formData: FormData): Observable<Evento> {
    return this.http.post<Evento>(`${this.apiUrl}/registrar`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  listarEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }
  obtenerEventoPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/id/${id}`);
  }
  eliminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  actualizarEvento(id: number, dto: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, dto, {
      headers: this.getAuthHeaders(),
    });
  }
  buscarPorUbicacion(ubicacion: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/ubicacion/${ubicacion}`, {
      headers: this.getAuthHeaders(),
    });
  }
   listarEventosPorUsuario(idUsuario: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }
}
