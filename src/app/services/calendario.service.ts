import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calendario } from '../models/Calendario';


@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private apiUrl = 'http://localhost:8080/api/calendario'; // Cambiar URL según tu backend

  constructor(private http: HttpClient) {}

  // Método para crear un nuevo calendario
  crearCalendario(calendario: Calendario): Observable<Calendario> {
    return this.http.post<Calendario>(`${this.apiUrl}/crear`, calendario);
  }

  // Método para obtener el calendario de un usuario por su ID
  getCalendarioPorUsuario(idUsuario: number): Observable<Calendario> {
    return this.http.get<Calendario>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  // Método para obtener todos los calendarios
  listarCalendarios(): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(`${this.apiUrl}`);
  }

  // Método para eliminar un calendario por ID
  eliminarCalendario(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
