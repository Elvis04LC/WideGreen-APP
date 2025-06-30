import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaPublicacion } from '../models/CategoriaPublicacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacioncategoriaService {
private apiUrl = 'http://localhost:8080/api/publicacion-categoria';

  constructor(private http: HttpClient) {}

  asociarCategoria(dto: { idPublicacion: number; idCategoria: number }) {
    return this.http.post(`${this.apiUrl}/asociar`, dto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') || ''}`
      }
    });
  }
  listarCategoriasPorPublicacion(idPublicacion: number) {
    return this.http.get(`${this.apiUrl}/publicacion/${idPublicacion}`);
  }
}
