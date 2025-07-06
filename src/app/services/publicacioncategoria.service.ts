import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaPublicacion } from '../models/CategoriaPublicacion';
import { Observable } from 'rxjs';
import { PublicacionCategoria } from '../models/publicacion-categoria';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacioncategoriaService {
private apiUrl = `${environment.apiUrl}/publicacion-categoria`;

  constructor(private http: HttpClient) {}

  asociarCategoria(dto: { idPublicacion: number; idCategoria: number }) {
    return this.http.post(`${this.apiUrl}/asociar`, dto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') || ''}`
      }
    });
  }
  listarCategoriasPorPublicacion(idPublicacion: number): Observable<PublicacionCategoria[]> {
    return this.http.get<PublicacionCategoria[]>(`${this.apiUrl}/publicacion/${idPublicacion}`);
  }
}
