import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapaDistrito } from '../models/MapaDistrito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapaDistritoService {
  private apiUrl = 'http://localhost:8080/api/mapa-distritos';

  constructor(private http: HttpClient) {}

  obtenerDistritos(): Observable<MapaDistrito[]> {
    return this.http.get<MapaDistrito[]>(this.apiUrl);
  }
}