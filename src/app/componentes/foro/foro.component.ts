import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForoService } from '../../services/foro.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Foro } from '../../models/Foro';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css'],
})
export class ForoComponent implements OnInit {
  foroForm!: FormGroup;
  foros: Foro[] = [];
  idUsuarioFormulario: number = 0; // Variable para almacenar el id del usuario (puedes obtenerlo de localStorage o del servicio de autenticación)

  constructor(
    private fb: FormBuilder,
    private foroService: ForoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.foroForm = this.fb.group({
      // Inicializamos 'foroForm' dentro de ngOnInit
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    });
    this.cargarForos();
  }
  cargarForos(): void {
    this.foroService.obtenerForos().subscribe({
      next: (data) => {
        this.foros = data.reverse(); // Cargar los foros más recientes primero
      },
      error: () => {
        this.snackBar.open('Error al cargar los foros', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
  crearForo() {
    if (this.foroForm.valid) {
      // Obtenemos el ID del usuario autenticado
      this.idUsuarioFormulario = this.getUsuarioId();

      // Preparamos los datos para el payload
      const foroPayload = {
        titulo: this.foroForm.get('titulo')?.value,
        descripcion: this.foroForm.get('descripcion')?.value,
      };

      this.foroService.crearForo(foroPayload).subscribe({
        next: (foroCreado) => {
          this.snackBar.open('Contribución creada con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.foroForm.reset();
          this.cargarForos();
        },
        error: (err) => {
          this.snackBar.open('Error al crear contribución', 'Cerrar', {
            duration: 3000,
          });
          console.error('Error al crear contribución:', err);
        },
      });
    }
  }

  // Método para obtener el ID del usuario, por ejemplo desde localStorage
  getUsuarioId(): number {
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Usuario encontrado en localStorage:', usuario); // Verifica si el usuario está en localStorage
    return usuario.id || 0; // Si no hay un usuario, se retorna 0
  }
}
