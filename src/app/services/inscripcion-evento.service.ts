import { Observable } from "rxjs";
import { InscripcionEventoDTO } from "../models/InscripcionEvento";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class InscripcionEventoService {
  private baseUrl = `${environment.apiUrl}/inscripciones`;

  constructor(private http: HttpClient) {}

  inscribirse(data: InscripcionEventoDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, data);
  }

  cancelar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cancelar/${id}`);
  }

  listarPorUsuario(idUsuario: number): Observable<InscripcionEventoDTO[]> {
    return this.http.get<InscripcionEventoDTO[]>(`${this.baseUrl}/usuario/${idUsuario}`);
  }

  contarPorEvento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/CantidadPorEvento`);
  }
   verificarInscripcion(idEvento: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verificar/${idEvento}`);
  }
}
