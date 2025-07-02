import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../models/PerfilUsuario';
// Asegúrate de tener este DTO

@Injectable({
  providedIn: 'root'
})
export class UsuarioPerfilService {
  private apiUrl = 'http://localhost:8080/api/perfil';  // URL del backend

  constructor(private http: HttpClient) {}

  // Método para registrar un perfil
  registrarPerfil(perfil: PerfilUsuario): Observable<PerfilUsuario> {
    return this.http.post<PerfilUsuario>(`${this.apiUrl}/registrar`, perfil);
  }

  // Método para obtener un perfil por ID
  obtenerPerfil(id: number): Observable<PerfilUsuario> {
    return this.http.get<PerfilUsuario>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener todos los perfiles
  listarPerfiles(): Observable<PerfilUsuario[]> {
    return this.http.get<PerfilUsuario[]>(`${this.apiUrl}`);
  }

  // Método para actualizar el perfil
  actualizarPerfil(id: number, perfil: PerfilUsuario): Observable<PerfilUsuario> {
    return this.http.put<PerfilUsuario>(`${this.apiUrl}/${id}`, perfil);
  }

  // Método para eliminar el perfil
  eliminarPerfil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  obtenerPerfilAutenticado(): Observable<PerfilUsuario> {
  return this.http.get<PerfilUsuario>('http://localhost:8080/api/perfil/autenticado');
  }

}
