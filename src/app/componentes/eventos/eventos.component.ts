import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Eventos';



@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  isLoading = true;

  constructor(
    private eventoService: EventoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this.eventoService.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al listar eventos:', error);
        this.snackBar.open('Error al cargar eventos', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.isLoading = false;
      }
    });
  }

  eliminarEvento(id: number): void {
    if (confirm('¿Deseas eliminar este evento?')) {
      this.eventoService.eliminarEvento(id).subscribe({
        next: () => {
          this.snackBar.open('✅ Evento eliminado', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.obtenerEventos();
        },
        error: () => {
          this.snackBar.open('Error al eliminar evento', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      });
    }
  }
}
