import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { PerfilUsuario } from '../../models/PerfilUsuario';

@Component({
  selector: 'app-usuario-perfil-editar-dialog',
  standalone: true,
  templateUrl: './usuario-perfil-editar-dialog.component.html',
  styleUrl: './usuario-perfil-editar-dialog.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class UsuarioPerfilEditarDialogComponent {
  perfilForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UsuarioPerfilEditarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PerfilUsuario,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.data.nombre, Validators.required],
      apellido: [this.data.apellido, Validators.required],
      foto: [this.data.foto],
      bio: [this.data.bio, Validators.maxLength(255)] 
    });
  }

  guardarCambios(): void {
    if (this.perfilForm.valid) {
      const perfilActualizado: PerfilUsuario = {
        ...this.data,
        ...this.perfilForm.value
      };
      this.dialogRef.close(perfilActualizado);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
