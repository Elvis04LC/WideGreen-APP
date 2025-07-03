import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizadorEvento } from '../models/Organizador';


@Injectable({
  providedIn: 'root'
})
export class OrganizadorEventoService {
  private baseUrl = 'http://localhost:8080/api/organizadores';

  constructor(private http: HttpClient) {}

  registrarOrganizador(dto: OrganizadorEvento): Observable<OrganizadorEvento> {
    return this.http.post<OrganizadorEvento>(`${this.baseUrl}/registrar`, dto);
  }

  listarOrganizadores(): Observable<OrganizadorEvento[]> {
    return this.http.get<OrganizadorEvento[]>(this.baseUrl);
  }

  eliminarOrganizador(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }
}
