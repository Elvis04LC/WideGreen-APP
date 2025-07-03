import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { MapaDistrito } from '../../models/MapaDistrito';


@Component({
  selector: 'app-mapa-distritos',
  imports: [
        CommonModule,
    GoogleMapsModule
  ],
  templateUrl: './mapa-distritos.component.html',
  styleUrl: './mapa-distritos.component.css'
})
export class MapaDistritosComponent {
  apiKey = ''; // lo pondremos en el HTML
  center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 }; // Lima por defecto
  zoom = 11;
  marcadores: MapaDistrito[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<MapaDistrito[]>('http://localhost:8080/api/mapa-distrito')
      .subscribe((distritos) => {
        this.marcadores = distritos;
      });
  }

}
