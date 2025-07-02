import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../models/PerfilUsuario';

@Injectable({ providedIn: 'root' })
export class UsuarioPerfilCrearService {
  private apiUrl = 'http://localhost:8080/api/perfil';

  constructor(private http: HttpClient) {}

  registrarPerfil(perfil: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/registrar`, perfil, { headers });
  }

}
