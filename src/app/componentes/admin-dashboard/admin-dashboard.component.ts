import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { OrganizadorFormularioComponent } from '../organizador-formulario/organizador-formulario.component';
import { MatDialog } from '@angular/material/dialog';
import { EventoOrganizadorFormularioComponent } from '../evento-organizador-formulario/evento-organizador-formulario.component';
import { TipoEventoFormularioComponent } from '../tipo-evento-formulario/tipo-evento-formulario.component';

// admin-dashboard.component.ts
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

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

  ngOnInit(): void {
    if (!this.isAdmin) {
      window.alert('Acceso restringido');
      // Redirigir si no es admin
    }
  }
  abrirDialogoOrganizador(): void {
    this.dialog.open(OrganizadorFormularioComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      panelClass: 'custom-dialog-container',
    });
  }
  abrirDialogoEventoOrganizador(): void {
    this.dialog.open(EventoOrganizadorFormularioComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      panelClass: 'custom-dialog-container',
    });
  }
  abrirDialogoTipoEvento(): void {
  this.dialog.open(TipoEventoFormularioComponent, {
    width: '400px',
    disableClose: true,
    autoFocus: true,
    panelClass: 'custom-dialog-container',
  });
}
}
