import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../models/Publicacion';


@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = 'http://localhost:8080/api/publicaciones';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  listarPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  crearPublicacion(formData: FormData): Observable<Publicacion> {
  return this.http.post<Publicacion>(`${this.apiUrl}/crear`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken') || ''}`
    }
  });
  }

  editarPublicacion(id: number, nuevoContenido: string): Observable<Publicacion> {
    return this.http.put<Publicacion>(`${this.apiUrl}/editar/${id}?nuevoContenido=${encodeURIComponent(nuevoContenido)}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarPublicacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
   obtenerPublicacionesPorCategoria(idCategoria: number): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.apiUrl}/categoria/${idCategoria}`, {
      headers: this.getAuthHeaders()
    });
  }
}

