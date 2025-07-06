import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Comentario } from "../models/Comentario";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  private baseUrl = `${environment.apiUrl}/comentarios`;

  constructor(private http: HttpClient) {}

  crearComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.baseUrl}/crear`, comentario);
  }

  listarPorPublicacion(id: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.baseUrl}/publicacion/${id}`);
  }

  eliminarComentario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`);
  }

  editarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.baseUrl}/editar`, comentario);
  }
}
