import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../services/evento.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { TipoEventoService } from '../../services/tipo-evento.service';
import { TipoEvento } from '../../models/TipoEvento';

@Component({
  selector: 'app-eventos-formulario',
  standalone: true,
  templateUrl: './eventos-formulario.component.html',
  styleUrls: ['./eventos-formulario.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class EventosFormularioComponent implements OnInit{
  eventoForm: FormGroup;
  tiposEvento: TipoEvento[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EventosFormularioComponent>,
    private eventoService: EventoService,
    private tipoEventoService: TipoEventoService,
    private snackBar: MatSnackBar
  ) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      idTipoEvento: ['', Validators.required]
    });
  }
  ngOnInit(): void {
      this.tipoEventoService.listarTipos().subscribe({
        next: (data) => this.tiposEvento = data,
        error: () => this.snackBar.open('❌ No se pudieron cargar los tipos de evento', 'Cerrar', { duration: 2000 })
      });
    }
  registrarEvento(): void {
    if (this.eventoForm.invalid) return;

    this.eventoService.crearEvento(this.eventoForm.value).subscribe({
      next: (res) => {
        this.snackBar.open('✅ Evento creado correctamente', 'Cerrar', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('❌ Error al registrar evento', 'Cerrar', { duration: 2000 });
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
