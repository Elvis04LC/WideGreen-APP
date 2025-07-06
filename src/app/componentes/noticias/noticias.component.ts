import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Noticia } from '../../models/Noticias';
import { NoticiasService } from '../../services/noticias.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { NoticiaDetalleDialogComponent } from '../noticia-detalle-dialog/noticia-detalle-dialog.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  formNoticia: FormGroup;
  imagenSeleccionada: File | null = null;
  previewUrl: string | null = null;
  busquedaTitulo: string = '';



  constructor(
    private fb: FormBuilder,
    private noticiaService: NoticiasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.formNoticia = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      fecha: ['', Validators.required],
      imagenUrl: ['', [Validators.pattern('^https?://.+')]]
    });
  }

  ngOnInit(): void {
    this.cargarNoticias();
  }

  get isAdmin(): boolean {
    const token = localStorage.getItem('jwtToken');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'ROLE_ADMIN';
    } catch {
      return false;
    }
  }
  quitarImagen(): void {
    this.imagenSeleccionada = null;
    this.previewUrl = null;
    // Limpiar input file visualmente si quieres, puedes usar @ViewChild
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];

      // Preview de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }

  crearNoticia(): void {
 if (this.formNoticia.invalid) return;

  const imagenUrl = (this.formNoticia.value.imagenUrl || '').trim();

  // Si el admin pegó una URL de imagen, envía JSON
  if (imagenUrl) {
    const noticiaData = {
      titulo: this.formNoticia.value.titulo,
      contenido: this.formNoticia.value.contenido,
      fecha: this.formNoticia.value.fecha,
      imagenUrl: imagenUrl
    };

    this.noticiaService.crearNoticia(noticiaData).subscribe({
      next: noticia => {
        this.snackBar.open('Noticia creada', 'Cerrar', { duration: 3000 });
        this.cargarNoticias();
        this.formNoticia.reset();
        this.imagenSeleccionada = null;
        this.previewUrl = '';
      },
      error: () => this.snackBar.open('Error al crear noticia', 'Cerrar', { duration: 3000 })
    });
    return;
  }

  // Si hay archivo, envía FormData
  if (this.imagenSeleccionada) {
    const formData = new FormData();
    formData.append('titulo', this.formNoticia.value.titulo);
    formData.append('contenido', this.formNoticia.value.contenido);

    // Formatea fecha a yyyy-MM-dd
    const fecha = this.formNoticia.value.fecha;
    let fechaFormateada = '';
    if (fecha instanceof Date) {
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, '0');
      const day = String(fecha.getDate()).padStart(2, '0');
      fechaFormateada = `${year}-${month}-${day}`;
    } else if (typeof fecha === 'string') {
      fechaFormateada = fecha.split('T')[0];
    }
    formData.append('fecha', fechaFormateada);

    formData.append('imagen', this.imagenSeleccionada);

    this.noticiaService.crearNoticia(formData).subscribe({
      next: noticia => {
        this.snackBar.open('Noticia creada', 'Cerrar', { duration: 3000 });
        this.cargarNoticias();
        this.formNoticia.reset();
        this.imagenSeleccionada = null;
        this.previewUrl = '';
      },
      error: () => this.snackBar.open('Error al crear noticia', 'Cerrar', { duration: 3000 })
    });
    return;
  }
  const noticiaSinImagen = {
    titulo: this.formNoticia.value.titulo,
    contenido: this.formNoticia.value.contenido,
    fecha: this.formNoticia.value.fecha
  };
  this.noticiaService.crearNoticia(noticiaSinImagen).subscribe({
    next: noticia => {
      this.snackBar.open('Noticia creada', 'Cerrar', { duration: 3000 });
      this.cargarNoticias();
      this.formNoticia.reset();
      this.imagenSeleccionada = null;
      this.previewUrl = '';
    },
    error: () => this.snackBar.open('Error al crear noticia', 'Cerrar', { duration: 3000 })
  });
  }

  cargarNoticias(): void {
    this.noticiaService.listarNoticias().subscribe({
      next: (data) => this.noticias = data,
      error: () => this.snackBar.open('Error al cargar las noticias', 'Cerrar', { duration: 3000 })
    });
  }
  abrirDetalle(noticia: Noticia): void {
  this.dialog.open(NoticiaDetalleDialogComponent, {
    width: '500px',
    data: noticia
  });
  
}
getImagenUrl(noticia: Noticia): string {
  // Si la imagen es una URL completa
  if (noticia.imagenUrl && noticia.imagenUrl.startsWith('http')) {
    return noticia.imagenUrl;
  }
  // Si es una ruta local/backend
  return 'https://widegreenapi.onrender.com' + noticia.imagenUrl;
}
buscarPorTitulo(): void {
  const titulo = this.busquedaTitulo.trim();
  if (!titulo) {
    this.cargarNoticias(); // Si el input está vacío, carga todas las noticias
    return;
  }
  this.noticiaService.filtrarNoticiasPorTema(titulo).subscribe({
    next: (data) => this.noticias = data,
    error: () => this.snackBar.open('Error al buscar noticias', 'Cerrar', { duration: 3000 }),
  });
}

limpiarBusqueda(): void {
  this.busquedaTitulo = '';
  this.cargarNoticias();
}
eliminarNoticia(id: number): void {
    // Pedir confirmación antes de eliminar
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer.');

    if (confirmacion) {
      this.noticiaService.eliminarNoticia(id).subscribe({
        next: () => {
          this.snackBar.open('Noticia eliminada con éxito', 'Cerrar', { duration: 3000 });
          this.cargarNoticias(); // Refresca la lista para quitar la noticia eliminada
        },
        error: () => {
          this.snackBar.open('Error al eliminar la noticia', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
