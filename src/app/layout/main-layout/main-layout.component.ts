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
  // Suscribimos el contador al observable reactivo
  this.notificacionService.notificacionesNoVistas$.subscribe({
    next: (contador) => {
      this.notificacionesNoVistas = contador;
    }
  });
  this.notificacionService.obtenerMisNotificaciones().subscribe();
}

  logout(): void {
    localStorage.removeItem('jwtToken'); //
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
