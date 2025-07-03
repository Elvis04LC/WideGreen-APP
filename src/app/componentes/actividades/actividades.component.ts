import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { ActividadCalendarioService } from '../../services/actividad-calendario.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActividadCalendario } from '../../models/Actividad-Calendario';
import { CalendarioService } from '../../services/calendario.service';
import { Calendario } from '../../models/Calendario';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-actividades',
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule
],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css',
})
export class ActividadesComponent {
  actividades: ActividadCalendario[] = [];
  idCalendario!: number;
  isLoading = true;
  errorMsg = '';

  constructor(
    private actividadService: ActividadCalendarioService,
    private calendarioService: CalendarioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.calendarioService.obtenerCalendarioAutenticado().subscribe({
      next: (calendario: Calendario) => {
        this.idCalendario = calendario.id;
        this.listarActividades(); // ahora que ya tienes el ID
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = 'Error al obtener calendario del usuario';
        console.error(err);
      },
    });
  }

  listarActividades(): void {
    this.actividadService
      .listarActividadesPorCalendario(this.idCalendario)
      .subscribe({
        next: (data) => {
          this.actividades = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = 'No se pudieron cargar las actividades';
          console.error(err);
        },
      });
  }
  eliminarActividad(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta actividad?')) {
      this.actividadService.eliminarActividad(id).subscribe({
        next: () => {
          this.snackBar.open('✅ Actividad eliminada', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.listarActividades(); // recarga las actividades con el mismo idCalendario
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          this.snackBar.open('❌ Error al eliminar actividad', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'top',
          });
        },
      });
    }
  }
}
