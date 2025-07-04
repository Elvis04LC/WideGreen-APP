import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Notificacion } from '../../models/Notificacion';
import { NotificacionService } from '../../services/notificacion.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent {
  private notificacionService = inject(NotificacionService);

  notificaciones: Notificacion[] = [];

  ngOnInit(): void {
    this.notificacionService.obtenerMisNotificaciones().subscribe({
      next: (data) => this.notificaciones = data,
      error: (err) => console.error('Error al obtener notificaciones', err)
    });
  }

  marcarComoVisto(id: number) {
    this.notificacionService.marcarComoVisto(id).subscribe({
      next: () => {
        this.notificaciones = this.notificaciones.map(n =>
          n.id === id ? { ...n, visto: true } : n
        );
      },
      error: (err) => console.error('Error al marcar como visto', err)
    });
  }
}
