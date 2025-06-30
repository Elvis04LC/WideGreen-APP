import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioLogin } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatIcon
  ],
  templateUrl: './usuario-login.component.html',
  styleUrl: './usuario-login.component.css'
})
export class UsuarioLoginComponent {
  formLogin: FormGroup;
  mostrarContrasena = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  iniciarSesion() {
    if (this.formLogin.invalid) {
    this.snackBar.open('Completa todos los campos correctamente.', 'Cerrar', { duration: 3000 });
    return;
  }

  const credentials: UsuarioLogin = this.formLogin.value;

  this.usuarioService.login(credentials).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/']); // Redirige a home o dashboard
    },
    error: () => {
      this.snackBar.open('Credenciales incorrectas. Intenta nuevamente.', 'Cerrar', { duration: 4000 });
    }
  });
  }
    goBack() {
    this.location.back();
  }
}
