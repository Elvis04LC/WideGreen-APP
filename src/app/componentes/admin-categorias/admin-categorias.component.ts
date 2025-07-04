import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoriaPublicacion } from '../../models/CategoriaPublicacion';
import { CategoriaPublicacionService } from '../../services/categoria-publicacion.service';
import { AdminCategoriasFormComponent } from '../admin-categorias-form/admin-categorias-form.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-categorias',
  standalone: true,
  templateUrl: './admin-categorias.component.html',
  styleUrls: ['./admin-categorias.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSnackBarModule, MatIconModule]
})
export class AdminCategoriasComponent implements OnInit {
  categorias: CategoriaPublicacion[] = [];
  displayedColumns: string[] = ['id', 'nombreCategoria', 'acciones'];

  constructor(
    private categoriaService: CategoriaPublicacionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: () => this.snackBar.open('Error al cargar categorías', 'Cerrar', { duration: 2000 })
    });
  }

  abrirDialogCrear(): void {
    const dialogRef = this.dialog.open(AdminCategoriasFormComponent, { width: '350px', data: null });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarCategorias();
    });
  }

  abrirDialogEditar(categoria: CategoriaPublicacion): void {
    const dialogRef = this.dialog.open(AdminCategoriasFormComponent, { width: '350px', data: categoria });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarCategorias();
    });
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Deseas eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(id).subscribe({
        next: () => {
          this.snackBar.open('Categoría eliminada', 'Cerrar', { duration: 2000 });
          this.cargarCategorias();
        },
        error: () => this.snackBar.open('Error al eliminar categoría', 'Cerrar', { duration: 2000 })
      });
    }
  }
}
