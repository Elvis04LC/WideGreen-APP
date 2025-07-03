import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizadorEventoService } from '../../services/organizador-evento.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-organizador-formulario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './organizador-formulario.component.html',
  styleUrls: ['./organizador-formulario.component.css']
})
export class OrganizadorFormularioComponent {
  formOrganizador: FormGroup;

  constructor(
    private fb: FormBuilder,
    private organizadorService: OrganizadorEventoService,
    private snackBar: MatSnackBar,
      private dialogRef: MatDialogRef<OrganizadorFormularioComponent>

  ) {
    this.formOrganizador = this.fb.group({
      nombreOrganizador: ['', [Validators.required, Validators.maxLength(100)]],
      contacto: ['', Validators.required]
    });
  }

  registrar(): void {
    if (this.formOrganizador.invalid) return;

    this.organizadorService.registrarOrganizador(this.formOrganizador.value).subscribe({
      next: () => {
        this.snackBar.open('Organizador registrado', 'Cerrar', { duration: 3000 });
        this.formOrganizador.reset();
        this.dialogRef.close();
      },
      error: () => {
        this.snackBar.open('Error al registrar organizador', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
