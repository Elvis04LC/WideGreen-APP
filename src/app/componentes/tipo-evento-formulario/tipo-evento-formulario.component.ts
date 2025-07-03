import { Component } from '@angular/core';
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

@Component({
  selector: 'app-tipo-evento-formulario',
  standalone: true,
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
  ],
  templateUrl: './tipo-evento-formulario.component.html'
})
export class TipoEventoFormularioComponent {
  tipoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tipoService: TipoEventoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TipoEventoFormularioComponent>
  ) {
    this.tipoForm = this.fb.group({
      nombreTipo: ['', Validators.required]
    });
  }

  registrar() {
    if (this.tipoForm.invalid) return;

    this.tipoService.registrarTipo(this.tipoForm.value).subscribe({
      next: () => {
        this.snackBar.open('✅ Tipo registrado correctamente', 'Cerrar', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('❌ Error al registrar tipo', 'Cerrar', { duration: 2000 });
      }
    });
  }
}
