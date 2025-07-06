import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/Noticias';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = `${environment.apiUrl}/noticias`;

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
crearNoticia(data: any) {
  // Automáticamente detecta si es FormData o JSON plano
  return this.http.post<Noticia>(
    `${environment.apiUrl}/noticias/crear`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') || ''}`
        // NO pongas Content-Type, Angular lo maneja solo
      }
    }
  );
}


  // Filtrar por fecha
  filtrarNoticiasPorFecha(fecha: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.apiUrl}/filtrar/fecha?fecha=${fecha}`);
  }

  // Filtrar por tema
  filtrarNoticiasPorTema(tema: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.apiUrl}/filtrar/tema?tema=${tema}`);
  }
  eliminarNoticia(id: number): Observable<void> {
  // El token de autorización ya debería ser manejado por tu interceptor de JWT
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}
