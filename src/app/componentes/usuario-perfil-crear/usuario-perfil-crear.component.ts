import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioPerfilCrearService } from '../../services/usuario-perfil-crear.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-perfil-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './usuario-perfil-crear.component.html',
  styleUrl: './usuario-perfil-crear.component.css'
})
export class UsuarioPerfilCrearComponent {
  perfilForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private perfilService: UsuarioPerfilCrearService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
      this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      foto: [''],
      bio: ['']
    });
  }


  registrarPerfil() {
    if (this.perfilForm.invalid) {
    return;
  }
  this.perfilService.registrarPerfil(this.perfilForm.value).subscribe({
    next: (res) => {
      this.snackBar.open('¡Perfil creado correctamente!', 'Cerrar', {
        duration: 2500, // en milisegundos
        verticalPosition: 'top'
      });
      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.snackBar.open('Error al registrar perfil', 'Cerrar', {
        duration: 2500,
        verticalPosition: 'top'
      });
      console.error(err);
    }
  });
  }
}
