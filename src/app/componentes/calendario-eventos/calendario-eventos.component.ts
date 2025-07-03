import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarModule, DateAdapter, CalendarView, CalendarMonthViewComponent } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ActividadCalendarioService } from '../../services/actividad-calendario.service';
import { ActividadCalendario } from '../../models/Actividad-Calendario';
import { CalendarWrapperModule } from '../../modules/calendar-wrapper.module';


registerLocaleData(localeEs);

@Component({
  selector: 'app-calendario-eventos',
  standalone: true,
  imports: [
    CommonModule,
    CalendarWrapperModule
  ],
  templateUrl: './calendario-eventos.component.html',
  styleUrl: './calendario-eventos.component.css',
})
export class CalendarioEventosComponent implements OnInit {
  actividadService = inject(ActividadCalendarioService);
activeDayIsOpen = false;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  ngOnInit(): void {
    const idCalendario = 15; // ← dinámico si lo deseas

    this.actividadService.listarActividadesPorCalendario(idCalendario).subscribe({
      next: (actividades: ActividadCalendario[]) => {
        this.events = actividades.map((actividad) => ({
          title: actividad.titulo,
          start: new Date(`${actividad.fecha}T${actividad.hora}`),
          color: { primary: '#388e3c', secondary: '#c8e6c9' },
        }));
      },
      error: (err) => console.error('Error cargando actividades', err),
    });
  }
  onDayClick({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  this.viewDate = date;
  this.activeDayIsOpen = events.length > 0;
}
}
