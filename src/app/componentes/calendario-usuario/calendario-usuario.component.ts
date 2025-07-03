import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioService } from '../../services/calendario.service';
import { Calendario } from '../../models/Calendario';
import { MatCardModule } from '@angular/material/card';
import { CalendarioEventosComponent } from '../calendario-eventos/calendario-eventos.component';

@Component({
  selector: 'app-calendario-usuario',
  standalone: true,
  imports: [CommonModule, MatCardModule,CalendarioEventosComponent],
  templateUrl: './calendario-usuario.component.html',
  styleUrls: ['./calendario-usuario.component.css']
})
export class CalendarioUsuarioComponent implements OnInit {
  calendario!: Calendario;
  isLoading = true;
  errorMsg = '';

  constructor(private calendarioService: CalendarioService) {}

  ngOnInit(): void {
    this.calendarioService.obtenerCalendarioAutenticado().subscribe({
      next: (data) => {
        this.calendario = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg = 'No se pudo cargar el calendario.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
