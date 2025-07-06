import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario, UsuarioLogin, UsuarioRegistro } from '../models/Usuario';
import { Token } from '../models/Token';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = '${environment.apiUrl}/auth';

  constructor(private http: HttpClient) {}

  registrar(usuario: UsuarioRegistro): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  login(credenciales: UsuarioLogin): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, credenciales).pipe(
      tap((res: Token) => {
        localStorage.setItem('jwtToken', res.token);
      })
    );
  }

  logout(): void {
    localStorage.clear();
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
  getUsuarioAutenticado(): Observable<Usuario> {
    return this.http.get<Usuario>(
      '${environment.apiUrl}/usuarios/autenticado'
    );
  }
  usuariosPorMes(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/usuarios/usuariosPorMes`
    );
  }
}
