import { Injectable } from '@angular/core';
import { CategoriaPublicacion } from '../models/CategoriaPublicacion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaPublicacionService {
  private apiUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<CategoriaPublicacion[]> {
    return this.http.get<CategoriaPublicacion[]>(`${this.apiUrl}/listar`);
  }

  crearCategoria(dto: CategoriaPublicacion): Observable<CategoriaPublicacion> {
    return this.http.post<CategoriaPublicacion>(`${this.apiUrl}/crear`, dto);
  }

  editarCategoria(dto: CategoriaPublicacion): Observable<CategoriaPublicacion> {
    return this.http.put<CategoriaPublicacion>(`${this.apiUrl}/editar`, dto);
  }

  eliminarCategoria(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/eliminar/${id}`);
  }
}
