import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Noticia } from '../../models/Noticias';

@Component({
  selector: 'app-noticia-detalle-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './noticia-detalle-dialog.component.html',
  styleUrl: './noticia-detalle-dialog.component.css'
})
export class NoticiaDetalleDialogComponent {
   constructor(
    public dialogRef: MatDialogRef<NoticiaDetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }
  getImagenUrl(noticia: Noticia): string {
    // Si la imagen es una URL completa
    if (noticia.imagenUrl && noticia.imagenUrl.startsWith('http')) {
      return noticia.imagenUrl;
    }
    // Si es una ruta local/backend
    return 'https://widegreenapi.onrender.com' + noticia.imagenUrl;
  }
}
