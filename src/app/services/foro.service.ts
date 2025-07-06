// foro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foro } from '../models/Foro';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ForoService {
  private apiUrl = `${environment.apiUrl}/foros`;  // URL del backend

  constructor(private http: HttpClient) {}

  crearForo(foroData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, foroData);
  }

  obtenerForos(): Observable<Foro[]> {
    return this.http.get<Foro[]>(`${this.apiUrl}/todos`);
  }

  obtenerForosPorUsuario(usuarioId: number): Observable<Foro[]> {
    return this.http.get<Foro[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}
