import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActividadCalendario } from '../models/Actividad-Calendario';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadCalendarioService {
private apiUrl = `${environment.apiUrl}/actividades-calendario`;

  constructor(private http: HttpClient) {}

  // Registrar nueva actividad para el usuario autenticado
  registrarActividad(actividad: ActividadCalendario): Observable<ActividadCalendario> {
    return this.http.post<ActividadCalendario>(`${this.apiUrl}/crear`, actividad);
  }

  // Listar actividades por id de calendario
  listarActividadesPorCalendario(idCalendario: number): Observable<ActividadCalendario[]> {
    return this.http.get<ActividadCalendario[]>(`${this.apiUrl}/listar/${idCalendario}`);
  }

  // Obtener una actividad específica por su ID
  obtenerActividad(idActividad: number): Observable<ActividadCalendario> {
    return this.http.get<ActividadCalendario>(`${this.apiUrl}/${idActividad}`);
  }

  // Eliminar una actividad por ID
  eliminarActividad(idActividad: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idActividad}`);
  }

}
