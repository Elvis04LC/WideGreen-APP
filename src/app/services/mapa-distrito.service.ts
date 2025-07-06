import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapaDistrito } from '../models/MapaDistrito';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapaDistritoService {
  private apiUrl = `${environment.apiUrl}/mapa-distritos`;

  constructor(private http: HttpClient) {}

  obtenerDistritos(): Observable<MapaDistrito[]> {
    return this.http.get<MapaDistrito[]>(this.apiUrl);
  }
}