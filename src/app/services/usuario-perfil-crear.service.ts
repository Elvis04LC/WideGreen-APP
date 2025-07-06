import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../models/PerfilUsuario';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioPerfilCrearService {
  private apiUrl = `${environment.apiUrl}/perfil`;

  constructor(private http: HttpClient) {}

registrarPerfil(perfilFormData: FormData): Observable<PerfilUsuario> {
  return this.http.post<PerfilUsuario>(`${this.apiUrl}/registrar`, perfilFormData);
}

}
