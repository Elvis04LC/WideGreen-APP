import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Notificacion } from '../../models/Notificacion';
import { NotificacionService } from '../../services/notificacion.service';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
})
export class NotificacionesComponent implements OnInit {
  notificaciones: Notificacion[] = [];
  notificacionesNoVistas: number = 0;
  constructor(public notificacionService: NotificacionService) {}
  ngOnInit(): void {
    // Suscríbete a las notificaciones para tener la lista actualizada siempre
    this.notificacionService.notificaciones$.subscribe({
      next: (data) => (this.notificaciones = data),
      error: (err) => console.error('Error al obtener notificaciones', err),
    });

    // Suscríbete al contador reactivo
    this.notificacionService.notificacionesNoVistas$.subscribe({
      next: (cantidad) => (this.notificacionesNoVistas = cantidad),
      error: (err) =>
        console.error('Error al observar contador notificaciones', err),
    });

    // Inicializa la carga de notificaciones
    this.notificacionService.obtenerMisNotificaciones().subscribe();
  }

  marcarComoVisto(id: number) {
    this.notificacionService.marcarComoVisto(id).subscribe({
      next: () => {
        // ¡No necesitas hacer nada aquí!
        // El servicio ya recarga y actualiza el BehaviorSubject global
      },
      error: (err) => console.error('Error al marcar como visto', err)
    });
  }
}
