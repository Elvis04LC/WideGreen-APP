import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Publicacion } from '../../models/Publicacion';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaPublicacion } from '../../models/CategoriaPublicacion';
import { PublicacioncategoriaService } from '../../services/publicacioncategoria.service';
import { CategoriaPublicacionService } from '../../services/categoria-publicacion.service';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-usuario-feed',
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule,
    MatInputModule,
    MatFormField,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './usuario-feed.component.html',
  styleUrl: './usuario-feed.component.css'
})
export class UsuarioFeedComponent {
  publicaciones: Publicacion[] = [];
  formPublicacion: FormGroup;
  imagenSeleccionada!: File | null;
  previewUrl: string | null = null;
  categorias: CategoriaPublicacion[] = [];
  idCategoriaSeleccionada!: number;

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private publicacionCategoriaService: PublicacioncategoriaService,
    private categoriaPublicacionService : CategoriaPublicacionService,
    private snackBar: MatSnackBar
  ) {
    this.formPublicacion = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      contenido: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.cargarPublicaciones();
    this.cargarCategorias();

  }
  cargarCategorias(): void {
    this.categoriaPublicacionService.listarCategorias().subscribe({
      next: data => this.categorias = data,
      error: () => this.snackBar.open('Error al cargar categorías', 'Cerrar', { duration: 3000 })
    });
  }
  cargarPublicaciones(): void {
     this.publicacionService.listarPublicaciones().subscribe({
    next: (data) => {
      console.log('📦 Publicaciones cargadas:', data);
      this.publicaciones = data.reverse();
    },
    error: () => this.snackBar.open('Error al cargar publicaciones', 'Cerrar', { duration: 3000 })
  });
  }

publicar(): void {
  if (this.formPublicacion.invalid) return;

  const formData = new FormData();
  formData.append('titulo', this.formPublicacion.get('titulo')?.value);
  formData.append('contenido', this.formPublicacion.get('contenido')?.value);

  if (this.imagenSeleccionada) {
    formData.append('imagen', this.imagenSeleccionada);
  }

  this.publicacionService.crearPublicacion(formData).subscribe({
    next: (publicacionCreada) => {
      if (this.idCategoriaSeleccionada) {
        this.publicacionCategoriaService.asociarCategoria({
          idPublicacion: publicacionCreada.idPublicacion,
          idCategoria: this.idCategoriaSeleccionada
        }).subscribe({
          next: () => {
            this.publicaciones.unshift(publicacionCreada);
            this.snackBar.open('¡Publicación y categoría asociadas!', 'Cerrar', { duration: 3000 });
            this.resetFormulario();
          },
          error: () => this.snackBar.open('Error al asociar categoría', 'Cerrar', { duration: 3000 })
        });
      } else {
        this.publicaciones.unshift(publicacionCreada);
        this.snackBar.open('¡Publicación creada!', 'Cerrar', { duration: 3000 });
        this.resetFormulario();
      }
    },
    error: () => this.snackBar.open('Error al crear publicación', 'Cerrar', { duration: 3000 })
  });
}

resetFormulario() {
  this.formPublicacion.reset();
  this.imagenSeleccionada = null;
  this.previewUrl = null;
}

  onFileSelected(event: Event): void {
   const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    this.imagenSeleccionada = fileInput.files[0];

    // Vista previa de imagen
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(this.imagenSeleccionada);
  }
}
  eliminar(id: number): void {
    this.publicacionService.eliminarPublicacion(id).subscribe({
      next: () => {
        this.publicaciones = this.publicaciones.filter(pub => pub.idPublicacion !== id);
        this.snackBar.open('Publicación eliminada', 'Cerrar', { duration: 3000 });
      },
      error: () => this.snackBar.open('No puedes eliminar esta publicación', 'Cerrar', { duration: 3000 })
    });
  }
  quitarImagen(): void {
    this.imagenSeleccionada = null;
    this.previewUrl = null;
  }
  editar(id: number): void {
    // puedes abrir un diálogo o input dinámico para editar. Lo dejamos preparado.
  }
}
