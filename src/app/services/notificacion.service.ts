import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Notificacion } from '../models/Notificacion';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private baseUrl = 'http://localhost:8080/api/notificaciones';
  private notificacionesNoVistasSubject = new BehaviorSubject<number>(0);
  private notificacionesSubject = new BehaviorSubject<Notificacion[]>([]);
  notificaciones$ = this.notificacionesSubject.asObservable();
  public notificacionesNoVistas$ =
    this.notificacionesNoVistasSubject.asObservable();
  constructor(private http: HttpClient) {}

  obtenerMisNotificaciones(): Observable<Notificacion[]> {
    this.http
      .get<Notificacion[]>(`${this.baseUrl}/mis-notificaciones`)
      .subscribe((data) => {
        this.notificacionesSubject.next(data);
        const cantidadNoVistas = data.filter((n) => !n.visto).length;
        this.notificacionesNoVistasSubject.next(cantidadNoVistas);
      });
    return this.notificaciones$;
  }

  marcarComoVisto(id: number): Observable<void> {
    return new Observable<void>(observer => {
      this.http.post<void>(`${this.baseUrl}/marcar-visto/${id}`, {}).subscribe({
        next: () => {
          this.obtenerMisNotificaciones().subscribe(); // Actualiza todo
          observer.next();
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
