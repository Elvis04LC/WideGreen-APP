import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../services/notificacion.service';

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatListModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  notificacionesNoVistas: number = 0;
  constructor(
    private router: Router,
    private notificacionService: NotificacionService
  ) {}
  ngOnInit(): void {
    this.notificacionService.obtenerMisNotificaciones().subscribe({
      next: (data) => {
        this.notificacionesNoVistas = data.filter((n) => !n.visto).length;
      },
      error: (err) => console.error('Error al cargar notificaciones', err),
    });
  }
  logout(): void {
    localStorage.removeItem('token'); //
    this.router.navigate(['/login']); //
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
}
