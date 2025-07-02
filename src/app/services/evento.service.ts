import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Eventos';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiUrl = 'http://localhost:8080/api/eventos';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  crearEvento(formData: FormData): Observable<Evento> {
    return this.http.post<Evento>(`${this.apiUrl}/registrar`,formData, {
      headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken') || ''}`
    }
  });
  }

  listarEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }
}
