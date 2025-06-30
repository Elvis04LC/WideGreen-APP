import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/Noticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = 'http://localhost:8080/api/noticias';

  constructor(private http: HttpClient) {}

  // Obtener todas las noticias
  listarNoticias(): Observable<Noticia[]> {
    const token = localStorage.getItem('jwtToken');
    
    // Configurar los encabezados con el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Noticia[]>(this.apiUrl, { headers });
  }

  // Obtener noticia por ID
  obtenerNoticiaPorId(id: number): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.apiUrl}/${id}`);
  }

  // Crear noticia
crearNoticia(formData: FormData) {
  return this.http.post<Noticia>('http://localhost:8080/api/noticias/crear', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken') || ''}`
    }
  });
}

  // Filtrar por fecha
  filtrarNoticiasPorFecha(fecha: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.apiUrl}/filtrar/fecha?fecha=${fecha}`);
  }

  // Filtrar por tema
  filtrarNoticiasPorTema(tema: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.apiUrl}/filtrar/tema?tema=${tema}`);
  }
}
