import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Eventos';
import { InscripcionEventoService } from '../../services/inscripcion-evento.service';
import { InscripcionEventoDTO } from '../../models/InscripcionEvento';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { ConfirmacionDialogComponent } from '../confirmacion-dialog/confirmacion-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inscripcion-evento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './inscripcion-evento.component.html',
  styleUrls: ['./inscripcion-evento.component.css'],
})
export class InscripcionEventoComponent implements OnInit {
  eventos: Evento[] = [];
  form: FormGroup;
  eventoNombre: string = '';

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private inscripcionService: InscripcionEventoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { idEvento: number }
  ) {
    this.form = this.fb.group({
      idEvento: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventoService.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data;

        // Si se pasó idEvento desde el diálogo, seleccionarlo por defecto
        if (this.data?.idEvento) {
          this.form.patchValue({ idEvento: this.data.idEvento });
          const eventoSeleccionado = data.find(
            (e) => e.id === this.data.idEvento
          );
          if (eventoSeleccionado) {
            this.eventoNombre = eventoSeleccionado.nombre;
          }
        }
      },
      error: () =>
        this.snackBar.open('Error al cargar eventos', 'Cerrar', {
          duration: 3000,
        }),
    });
  }

  abrirDialogConfirmacion(): void {
    if (this.form.valid) {
      const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
        width: '400px',
        data: { mensaje: '¿Deseas registrarte a este evento?' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const dto: InscripcionEventoDTO = {
            idEvento: this.form.value.idEvento,
            idUsuario: 0, // será ignorado en backend
            fechaInscripcion: new Date().toISOString(),
          };

          this.inscripcionService.inscribirse(dto).subscribe({
            next: () =>
              this.snackBar.open('✅ Inscripción exitosa', 'Cerrar', {
                duration: 3000,
                verticalPosition: 'top',
              }),
            error: () =>
              this.snackBar.open(
                '⚠️ Ya estabas inscrito. La inscripción fue cancelada.',
                'Cerrar',
                {
                  duration: 4000,
                  verticalPosition: 'top',
                }
              ),
          });
        }
      });
    }
  }

  cerrarDialogo(): void {
  this.dialog.closeAll();
}

}
