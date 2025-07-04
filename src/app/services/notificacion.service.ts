import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Notificacion } from '../models/Notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private baseUrl = 'http://localhost:8080/api/notificaciones';

  constructor(private http: HttpClient) {}

  obtenerMisNotificaciones(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.baseUrl}/mis-notificaciones`);
  }

  marcarComoVisto(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/marcar-visto/${id}`, {});
  }
}
