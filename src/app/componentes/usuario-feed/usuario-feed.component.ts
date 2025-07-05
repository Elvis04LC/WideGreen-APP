import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Publicacion } from '../../models/Publicacion';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { HttpClientModule } from '@angular/common/http';
import { CategoriaPublicacion } from '../../models/CategoriaPublicacion';
import { PublicacioncategoriaService } from '../../services/publicacioncategoria.service';
import { CategoriaPublicacionService } from '../../services/categoria-publicacion.service';
import { MatSelectModule } from '@angular/material/select';
import { PublicacionCategoria } from '../../models/publicacion-categoria';
import { ComentariosPublicacionComponent } from '../comentarios-publicacion/comentarios-publicacion.component';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-feed',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormField,
    //HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    ComentariosPublicacionComponent,
  ],
  templateUrl: './usuario-feed.component.html',
  styleUrl: './usuario-feed.component.css',
})
export class UsuarioFeedComponent {
  publicaciones: Publicacion[] = [];
  formPublicacion: FormGroup;
  imagenSeleccionada!: File | null;
  urlImagenSeleccionada = false;
  previewUrl: string | null = null;
  categorias: CategoriaPublicacion[] = [];
  idCategoriaSeleccionada: number | null = null;
  publicacionCategoria: PublicacionCategoria[] = [];
  idCategoriaFormulario: number | null = null;
  showComentarios: { [key: number]: boolean } = {};
  usuario: Usuario | undefined;
  likes: { [key: number]: Set<number> } = {};

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private publicacionCategoriaService: PublicacioncategoriaService,
    private categoriaPublicacionService: CategoriaPublicacionService,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService
  ) {
    this.formPublicacion = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      contenido: ['', [Validators.required, Validators.maxLength(500)]],
      idCategoria: ['', Validators.required],
      urlImagen: [''],
    });
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado().subscribe({
      next: (usuario) => {
        this.usuario = usuario; // Asignamos el usuario autenticado
        this.cargarPublicaciones();
      },
      error: () =>
        this.snackBar.open('Error al obtener el usuario', 'Cerrar', {
          duration: 3000,
        }),
    });
    this.cargarCategorias();
  }
  toggleComentarios(id: number): void {
    this.showComentarios[id] = !this.showComentarios[id];
  }
  cargarCategorias(): void {
    this.categoriaPublicacionService.listarCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: () =>
        this.snackBar.open('Error al cargar categorías', 'Cerrar', {
          duration: 3000,
        }),
    });
  }
  cargarPublicaciones(): void {
    this.publicacionService.listarPublicaciones().subscribe({
      next: (data) => {
        console.log('📦 Publicaciones cargadas:', data);
        this.publicaciones = data.reverse();
        // Inicializamos el Map para manejar "Me gusta" por publicación
        this.publicaciones.forEach((pub) => {
          if (!this.likes[pub.idPublicacion]) {
            this.likes[pub.idPublicacion] = new Set(); // Inicializamos el Set para los likes
          }
        });
      },
      error: () =>
        this.snackBar.open('Error al cargar publicaciones', 'Cerrar', {
          duration: 3000,
        }),
    });
  }
  toggleLike(publicacionId: number): void {
    if (this.usuario) {
      console.log(`Usuario ${this.usuario.idUsuario} hizo clic en "Me gusta" para publicación ${publicacionId}`);

      // Verificamos si el usuario ya ha dado "Me gusta"
      const hasLiked = this.likes[publicacionId].has(this.usuario.idUsuario);
      console.log(
        `Usuario ${this.usuario.idUsuario} haciendo clic en "Me gusta" para publicación ${publicacionId}`
      );
      console.log(
        `Estado de "Me gusta" actual: ${
          hasLiked ? 'Ya ha dado Me gusta' : 'No ha dado Me gusta'
        }`
      );

      if (hasLiked) {
        // Si ya dio "Me gusta", lo quitamos
        this.likes[publicacionId].delete(this.usuario.idUsuario);
      } else {
        // Si no ha dado "Me gusta", lo agregamos
        this.likes[publicacionId].add(this.usuario.idUsuario);
        console.log(
          `Añadido "Me gusta" a la publicación ${publicacionId} por el usuario ${this.usuario.idUsuario}`
        );
      }
    } else {
      console.log('No hay usuario autenticado.');
    }
  }
  getLikeCount(publicacionId: number): number {
    return this.likes[publicacionId]?.size || 0; // Devolvemos el tamaño del Set de "Me gusta"
  }

  publicar(): void {
    if (this.formPublicacion.invalid) return;

    const formData = new FormData();
    formData.append('titulo', this.formPublicacion.get('titulo')?.value);
    formData.append('contenido', this.formPublicacion.get('contenido')?.value);

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    } else if (this.formPublicacion.get('urlImagen')?.value) {
      formData.append(
        'urlImagen',
        this.formPublicacion.get('urlImagen')?.value
      );
    }

    this.publicacionService.crearPublicacion(formData).subscribe({
      next: (publicacionCreada) => {
        this.idCategoriaFormulario =
          this.formPublicacion.get('idCategoria')?.value;
        if (this.idCategoriaFormulario) {
          // Crear un objeto de tipo PublicacionCategoria para asociar la categoría
          const publicacionCategoria = {
            idPublicacion: publicacionCreada.idPublicacion,
            idCategoria: this.idCategoriaFormulario,
          };

          this.publicacionCategoriaService
            .asociarCategoria(publicacionCategoria)
            .subscribe({
              next: () => {
                this.publicaciones.unshift(publicacionCreada);
                this.snackBar.open(
                  '¡Publicación y categoría asociadas!',
                  'Cerrar',
                  { duration: 3000 }
                );
                this.resetFormulario();
              },
              error: () =>
                this.snackBar.open('Error al asociar categoría', 'Cerrar', {
                  duration: 3000,
                }),
            });
        } else {
          this.publicaciones.unshift(publicacionCreada);
          this.snackBar.open('¡Publicación creada!', 'Cerrar', {
            duration: 3000,
          });
          this.resetFormulario();
        }
      },
      error: () =>
        this.snackBar.open('Error al crear publicación', 'Cerrar', {
          duration: 3000,
        }),
    });
  }

  resetFormulario() {
    this.formPublicacion.reset();
    this.imagenSeleccionada = null;
    this.previewUrl = null;
    this.urlImagenSeleccionada = false;
    this.idCategoriaFormulario = null; // Resetear la categoría seleccionada en el formulario
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.imagenSeleccionada = fileInput.files[0];
      this.urlImagenSeleccionada = false;
      this.formPublicacion.get('urlImagen')?.disable();
      // Vista previa de imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }
  onUrlImagenChange(event: any) {
    this.urlImagenSeleccionada = event.target.value ? true : false;
    this.imagenSeleccionada = null; // Desactivar la opción de imagen si se puso una URL
    if (!this.imagenSeleccionada) {
      this.formPublicacion.get('urlImagen')?.enable();
    }
  }
  eliminar(id: number): void {
    this.publicacionService.eliminarPublicacion(id).subscribe({
      next: () => {
        this.publicaciones = this.publicaciones.filter(
          (pub) => pub.idPublicacion !== id
        );
        this.snackBar.open('Publicación eliminada', 'Cerrar', {
          duration: 3000,
        });
      },
      error: () =>
        this.snackBar.open('No puedes eliminar esta publicación', 'Cerrar', {
          duration: 3000,
        }),
    });
  }
  quitarImagen(): void {
    this.imagenSeleccionada = null;
    this.previewUrl = null;
  }
  editar(id: number): void {
    // puedes abrir un diálogo o input dinámico para editar. Lo dejamos preparado.
  }
  filtrarPorCategoria(): void {
    if (this.idCategoriaSeleccionada) {
      // Llamar al servicio para obtener las publicaciones filtradas por categoría
      this.publicacionService
        .obtenerPublicacionesPorCategoria(this.idCategoriaSeleccionada)
        .subscribe({
          next: (data) => {
            this.publicaciones = data; // Actualizar las publicaciones con las obtenidas de la categoría seleccionada
          },
          error: () =>
            this.snackBar.open(
              'Error al obtener publicaciones por categoría',
              'Cerrar',
              { duration: 3000 }
            ),
        });
    } else {
      // Si no se selecciona ninguna categoría, cargar todas las publicaciones
      this.cargarPublicaciones();
    }
  }
}
