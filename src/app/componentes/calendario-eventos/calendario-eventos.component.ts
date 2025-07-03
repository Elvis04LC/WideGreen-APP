import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarEvent,
  CalendarModule,
  DateAdapter,
  CalendarView,
  CalendarMonthViewComponent,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ActividadCalendarioService } from '../../services/actividad-calendario.service';
import { ActividadCalendario } from '../../models/Actividad-Calendario';
import { CalendarWrapperModule } from '../../modules/calendar-wrapper.module';
import { CalendarioService } from '../../services/calendario.service';
import { UsuarioService } from '../../services/usuario.service';

registerLocaleData(localeEs);

@Component({
  selector: 'app-calendario-eventos',
  standalone: true,
  imports: [CommonModule, CalendarWrapperModule],
  templateUrl: './calendario-eventos.component.html',
  styleUrl: './calendario-eventos.component.css',
})
export class CalendarioEventosComponent implements OnInit {
  actividadService = inject(ActividadCalendarioService);
  calendarioService = inject(CalendarioService);
  usuarioService = inject(UsuarioService);

  activeDayIsOpen = false;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

ngOnInit(): void {
  this.usuarioService.getUsuarioAutenticado().subscribe({
    next: (usuario) => {
      const idUsuario = usuario.idUsuario;

      this.calendarioService.getCalendarioPorUsuario(idUsuario).subscribe({
        next: (calendario) => {
          const idCalendario = calendario.id;

          this.actividadService.listarActividadesPorCalendario(idCalendario).subscribe({
            next: (actividades) => {
              this.events = actividades.map((actividad) => ({
                title: actividad.titulo,
                start: new Date(`${actividad.fecha}T${actividad.hora}`),
                color: { primary: '#388e3c', secondary: '#c8e6c9' },
              }));
            },
            error: (err) => console.error('Error cargando actividades', err),
          });
        },
        error: (err) => console.error('Error obteniendo calendario del usuario', err),
      });
    },
    error: (err) => console.error('Error obteniendo usuario autenticado', err),
  });
}


  onDayClick({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.viewDate = date;
    this.activeDayIsOpen = events.length > 0;
  }
  obtenerIdUsuarioDesdeToken(): number {
  const token = localStorage.getItem('jwtToken');
  if (!token) return 0;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id; // asegúrate que el ID viene como "id"
  } catch {
    return 0;
  }
}

}
