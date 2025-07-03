import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-acerca-de',
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule,
    NavbarComponent
  ],
  templateUrl: './acerca-de.component.html',
  styleUrl: './acerca-de.component.css'
})
export class AcercaDeComponent {
scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}
