import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nuestro-equipo',
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule,
    NavbarComponent,
    MatIconModule
  ],
  templateUrl: './nuestro-equipo.component.html',
  styleUrl: './nuestro-equipo.component.css'
})
export class NuestroEquipoComponent {
integrantes = [
    {
      nombre: 'Lucía Ly Aslla',
      rol: 'CEO, Co-Founder',
      descripcion: 'Lucía es una apasionada por el impacto ambiental positivo y la innovación tecnológica con enfoque social.',
      imagen: '/assets/lucia.jpeg',
      redes: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      nombre: 'Elvis Larico Chavez',
      rol: 'CEO, Co-Founder',
      descripcion: 'Elvis es un constructor de comunidades que fomenta la colaboración entre los entusiastas del medio ambiente.',
      imagen: '/assets/elvis.jpeg',
      redes: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      nombre: 'Maikol Garcia Zavaleta',
      rol: 'CEO, Co-Founder',
      descripcion: 'Maikol, un diseñador talentoso, está comprometido con soluciones innovadoras para los problemas ambientales.',
      imagen: '/assets/',
      redes: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      nombre: 'Gabriel Infante Sutta',
      rol: 'CEO, Co-Founder',
      descripcion: 'Gabriel es un ingeniero comprometido con el desarrollo de soluciones sustentables y le apasiona planear y difundir iniciativas medioambientales.',
      imagen: '/assets/gabriel.jpeg',
      redes: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    }
  ];

  scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}
