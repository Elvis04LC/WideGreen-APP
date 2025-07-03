import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { CalendarioService } from '../../services/calendario.service';
import { Calendario } from '../../models/Calendario';
import { PerfilUsuario } from '../../models/PerfilUsuario';
import { UsuarioPerfilService } from '../../services/usuario-perfil.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../models/Publicacion';
import { CommonModule } from '@angular/common';
import { CalendarioUsuarioComponent } from '../calendario-usuario/calendario-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioPerfilEditarDialogComponent } from '../usuario-perfil-editar-dialog/usuario-perfil-editar-dialog.component';

@Component({
  selector: 'app-usuario-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    CalendarioUsuarioComponent, // Para el spinner de carga
  ],
  templateUrl: './usuario-perfil.component.html',
  styleUrl: './usuario-perfil.component.css',
})
export class UsuarioPerfilComponent implements OnInit {
  perfil!: PerfilUsuario;
  isLoading: boolean = true;
  publicaciones: Publicacion[] = [];

  constructor(
    private usuarioPerfilService: UsuarioPerfilService,
    private publicacionService: PublicacionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPerfilAutenticadoYPublicaciones();
  }

  getPerfilAutenticadoYPublicaciones(): void {
    this.usuarioPerfilService.obtenerPerfilAutenticado().subscribe({
      next: (perfil) => {
        this.perfil = perfil;
        console.log('Perfil autenticado cargado:', perfil);
        this.getPublicacionesDelUsuario(perfil.idUsuario);
      },
      error: (error) => {
        console.error('Error al obtener el perfil autenticado', error);
        this.isLoading = false;
      },
    });
  }

  getPublicacionesDelUsuario(idUsuario: number): void {
    this.publicacionService.listarPorUsuario(idUsuario).subscribe({
      next: (data) => {
        this.publicaciones = data.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener publicaciones del usuario', error);
        this.isLoading = false;
      },
    });
  }
  // Método para actualizar el perfil del usuario
  actualizarPerfil(): void {
    const dialogRef = this.dialog.open(UsuarioPerfilEditarDialogComponent, {
      width: '400px',
      data: this.perfil,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usuarioPerfilService
          .actualizarPerfil(this.perfil.id, result)
          .subscribe({
            next: (perfilActualizado) => {
              this.perfil = perfilActualizado;
              console.log('✅ Perfil actualizado correctamente');
            },
            error: (err) => {
              console.error('❌ Error al actualizar el perfil', err);
            },
          });
      }
    });
  }
}
