import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf} from '@angular/common';
import { Location } from '@angular/common';
// Angular Material standalone components
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioRegistro } from '../../models/Usuario';


@Component({
  selector: 'app-usuario-registrar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    NgIf,
    MatError,
    MatIcon
  ],
  templateUrl: './usuario-registrar.component.html',
  styleUrl: './usuario-registrar.component.css'
})
export class UsuarioRegistrarComponent {
  formRegistro: FormGroup;
  mostrarContrasena: boolean = false;
  hide: boolean = true;


  constructor(private fb: FormBuilder, private location: Location,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar) {
    this.formRegistro = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  registrarUsuario(): void {
    if (this.formRegistro.invalid) {
      this.snackBar.open('Completa correctamente todos los campos.', 'Cerrar', { duration: 3000 });
      return;
    }
    const usuario: UsuarioRegistro = {
      username: this.formRegistro.value.username,
      email: this.formRegistro.value.email,
      password: this.formRegistro.value.password
    };

      this.usuarioService.registrar(usuario).subscribe({
        next: (res) => {
          this.snackBar.open(res.message || 'Usuario registrado correctamente', 'Cerrar', { duration: 3000 });
          this.formRegistro.reset();
        },
        error: (err) => {
          this.snackBar.open(`Error al registrar: ${err.error?.error || 'verifica los datos'}`, 'Cerrar', { duration: 4000 });
        }
      });
  }
  goBack() {
    this.location.back();
  }
}
