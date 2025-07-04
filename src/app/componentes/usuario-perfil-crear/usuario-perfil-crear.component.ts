import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioPerfilCrearService } from '../../services/usuario-perfil-crear.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-perfil-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './usuario-perfil-crear.component.html',
  styleUrl: './usuario-perfil-crear.component.css',
})
export class UsuarioPerfilCrearComponent {
  perfilForm!: FormGroup;
  imagenSeleccionada: File | null = null;
  urlImagenSeleccionada = false;
  previewUrl: string | null = null;
  modoImagenLocal = false;
  modoUrlImagen = false;
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
      bio: [''],
      urlImagen: [''],
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.imagenSeleccionada = fileInput.files[0];
      this.urlImagenSeleccionada = false;

      this.perfilForm.get('urlImagen')?.disable();

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }
  eliminarImagen(): void {
    this.previewUrl = null;
    this.imagenSeleccionada = null;
    this.urlImagenSeleccionada = false;

    this.perfilForm.get('urlImagen')?.enable();
    this.perfilForm.get('urlImagen')?.reset();
  }
  onUrlImagenChange(event: any): void {
    const value = (event.target as HTMLInputElement).value;
    if (value && value.trim() !== '') {
      this.urlImagenSeleccionada = true;
      this.imagenSeleccionada = null;
      this.previewUrl = value;
    } else {
      this.urlImagenSeleccionada = false;
      this.previewUrl = null;
    }
  }

  registrarPerfil() {
    if (this.perfilForm.invalid) return;

    const formValues = this.perfilForm.value;
    const formData = new FormData();

    formData.append('nombre', formValues.nombre);
    formData.append('apellido', formValues.apellido);
    formData.append('bio', formValues.bio);

    // Si el usuario subió un archivo
    if (this.imagenSeleccionada) {
      formData.append('foto', this.imagenSeleccionada);
    }
    // Si el usuario colocó una URL
    else if (this.urlImagenSeleccionada && formValues.urlImagen) {
      formData.append('urlfoto', formValues.urlImagen);
    }

    this.perfilService.registrarPerfil(formData).subscribe({
      next: () => {
        this.snackBar.open('¡Perfil creado correctamente!', 'Cerrar', {
          duration: 2500,
          verticalPosition: 'top',
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open('Error al registrar perfil', 'Cerrar', {
          duration: 2500,
          verticalPosition: 'top',
        });
        console.error(err);
      },
    });
  }
}
