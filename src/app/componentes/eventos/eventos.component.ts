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
import { EventosFormularioComponent } from '../eventos-formulario/eventos-formulario.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OrganizadorEvento } from '../../models/Organizador';
import { EventoOrganizador } from '../../models/EventoOrganizador';
import { EventoOrganizadorService } from '../../services/evento-organizador.service';
import { OrganizadorEventoService } from '../../services/organizador-evento.service';
import { MatChipsModule } from '@angular/material/chips';
import { TipoEventoService } from '../../services/tipo-evento.service';
import { TipoEvento } from '../../models/TipoEvento';
import { InscripcionEventoDTO } from '../../models/InscripcionEvento';
import { ConfirmacionDialogComponent } from '../confirmacion-dialog/confirmacion-dialog.component';
import { InscripcionEventoService } from '../../services/inscripcion-evento.service';
import { InscripcionEventoComponent } from '../inscripcion-evento/inscripcion-evento.component';

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
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
  ],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  isLoading = true;
  organizadores: OrganizadorEvento[] = [];
  eventoOrganizadores: EventoOrganizador[] = [];
  tiposEvento: TipoEvento[] = [];

  constructor(
    private eventoService: EventoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private organizadorService: OrganizadorEventoService,
    private eventoOrganizadorService: EventoOrganizadorService,
    private inscripcionService: InscripcionEventoService,
    private tipoEventoService: TipoEventoService
  ) {}

  ngOnInit(): void {
    this.cargarEventosConOrganizadores();
    this.tipoEventoService.listarTipos().subscribe({
      next: (data) => {
        this.tiposEvento = data;
      },
      error: (error) => {
        console.error('Error al cargar tipos de evento:', error);
      },
    });
  }
  cargarEventosConOrganizadores(): void {
    Promise.all([
      this.eventoService.listarEventos().toPromise(),
      this.organizadorService.listarOrganizadores().toPromise(),
      this.eventoOrganizadorService.listar().toPromise(),
    ])
      .then(([eventos, organizadores, relaciones]) => {
        this.organizadores = organizadores ?? [];
        this.eventoOrganizadores = relaciones ?? [];

        this.eventos = (eventos ?? []).map((evento) => {
          const organizadoresDeEvento = this.eventoOrganizadores
            .filter((eo) => eo.idEvento === evento.id)
            .map((eo) => {
              const org = this.organizadores.find(
                (o) => o.idOrganizador === eo.idOrganizador
              );
              return org ? org.nombreOrganizador : 'Desconocido';
            });

          const tipo = this.tiposEvento.find(
            (t) => t.idTipoEvento === evento.idTipoEvento
          );

          return {
            ...evento,
            organizadores: organizadoresDeEvento,
            nombreTipoEvento: tipo?.nombreTipo ?? 'Tipo desconocido',
          };
        });

        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error al cargar eventos con organizadores:', error);
        this.snackBar.open('Error al cargar eventos', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.isLoading = false;
      });
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
          verticalPosition: 'top',
        });
        this.isLoading = false;
      },
    });
  }
  get isAdmin(): boolean {
    const token = localStorage.getItem('jwtToken');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'ROLE_ADMIN'; // o el nombre exacto del rol
    } catch {
      return false;
    }
  }
  eliminarEvento(id: number): void {
    if (confirm('¿Deseas eliminar este evento?')) {
      this.eventoService.eliminarEvento(id).subscribe({
        next: () => {
          this.snackBar.open('✅ Evento eliminado', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.obtenerEventos();
        },
        error: () => {
          this.snackBar.open('Error al eliminar evento', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
          });
        },
      });
    }
  }
  abrirDialogRegistro(): void {
    const dialogRef = this.dialog.open(EventosFormularioComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerEventos(); // Refrescar la lista si se creó uno nuevo
      }
    });
  }
  abrirFormularioInscripcion(idEvento: number): void {
    const dialogRef = this.dialog.open(InscripcionEventoComponent, {
      width: '500px',
      data: { idEvento },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('✅ Inscripción registrada', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
