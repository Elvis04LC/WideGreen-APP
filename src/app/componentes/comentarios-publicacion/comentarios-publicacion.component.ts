import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comentario } from '../../models/Comentario';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComentarioService } from '../../services/comentario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comentarios-publicacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './comentarios-publicacion.component.html',
  styleUrls: ['./comentarios-publicacion.component.css']
})
export class ComentariosPublicacionComponent implements OnInit {
  @Input() idPublicacion!: number;

  comentarios: Comentario[] = [];
  formComentario!: FormGroup;
  usuarioActual: string = '';

  constructor(
    private comentarioService: ComentarioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.obtenerEmailDesdeJWT();
    this.listarComentarios();

    this.formComentario = this.fb.group({
      contenido: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  listarComentarios(): void {
    this.comentarioService.listarPorPublicacion(this.idPublicacion).subscribe({
      next: (data) => this.comentarios = data,
      error: () => this.snackBar.open('Error al cargar comentarios', 'Cerrar', { duration: 3000 })
    });
  }

  publicarComentario(): void {
    if (this.formComentario.invalid) return;

    const nuevoComentario: Comentario = {
      idPublicacion: this.idPublicacion,
      contenido: this.formComentario.value.contenido
    };

    this.comentarioService.crearComentario(nuevoComentario).subscribe(() => {
      this.formComentario.reset();
      this.listarComentarios();
    });
  }

  eliminarComentario(idComentario: number): void {
    this.comentarioService.eliminarComentario(idComentario).subscribe(() => {
      this.listarComentarios();
    });
  }

  obtenerEmailDesdeJWT(): string {
    const token = localStorage.getItem('jwtToken');
    if (!token) return '';
    try {
      return JSON.parse(atob(token.split('.')[1])).sub;
    } catch {
      return '';
    }
  }
}
