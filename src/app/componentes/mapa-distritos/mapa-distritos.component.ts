import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MapaDistrito } from '../../models/MapaDistrito';
import { MapaDistritoService } from '../../services/mapa-distrito.service';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Eventos';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-mapa-distritos',
  imports: [
    CommonModule,
    GoogleMapsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './mapa-distritos.component.html',
  styleUrl: './mapa-distritos.component.css',
})
export class MapaDistritosComponent {
  apiKey = ''; // lo pondremos en el HTML
  center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 }; // Lima por defecto
  zoom = 11;
  marcadores: MapaDistrito[] = [];
  eventosDistrito: Evento[] = [];
  searchDistrito = '';
  distritosFiltrados: MapaDistrito[] = [];

  distritoSeleccionado: MapaDistrito | null = null;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(
    private http: HttpClient,
    private mapaDistritoService: MapaDistritoService,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    this.mapaDistritoService.obtenerDistritos().subscribe({
      next: (distritos) => {
        this.marcadores = distritos;
        this.distritosFiltrados = distritos;
        // Aquí puedes llamar a tu lógica para poner marcadores en Google Maps
      },
      error: (err) => {
        console.error('Error al cargar distritos', err);
      },
    });
  }
  abrirInfo(distrito: MapaDistrito, marker: MapMarker) {
    this.distritoSeleccionado = distrito;
    this.eventosDistrito = [];
    this.eventoService.buscarPorUbicacion(distrito.nombreDistrito).subscribe({
      next: (eventos) => (this.eventosDistrito = eventos),
      error: (err) => console.error(marker),
    });
    this.infoWindow.open(marker);
  }
  filtrarDistritos() {
    const texto = this.searchDistrito.toLowerCase();
    this.distritosFiltrados = this.marcadores.filter((d) =>
      d.nombreDistrito.toLowerCase().includes(texto)
    );
  }

  buscarYEnfocarDistrito(nombreDistrito: string) {
    const distrito = this.marcadores.find(
      (d) => d.nombreDistrito.toLowerCase() === nombreDistrito.toLowerCase()
    );
    if (distrito) {
      this.center = { lat: distrito.latitud, lng: distrito.longitud };
      this.zoom = 13;
      // Opcional: abrir el InfoWindow automáticamente
      // Debes tener referencia al marker. Aquí solo centra.
    }
  }
}
