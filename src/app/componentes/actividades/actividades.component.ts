import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { ActividadCalendarioService } from '../../services/actividad-calendario.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActividadCalendario } from '../../models/Actividad-Calendario';
import { CalendarioService } from '../../services/calendario.service';
import { Calendario } from '../../models/Calendario';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Evento } from '../../models/Eventos';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-actividades',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule, // ⬅️ Necesario
    MatNativeDateModule, // ⬅️ Necesario para tipo Date
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css',
})
export class ActividadesComponent {
  idUsuario!: number;
  actividades: ActividadCalendario[] = [];
  hoy: string = new Date().toISOString().split('T')[0];
  listaEventos: Evento[] = [];
  actividadForm: FormGroup;
  idCalendario!: number;
  isLoading = true;
  nuevaActividad: {
    titulo: string;
    descripcion: string;
    fecha: string;
    hora: string;
    idEvento: number | null;
    fechaEvento: string;
  } = {
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    idEvento: null,
    fechaEvento: '',
  };
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private actividadService: ActividadCalendarioService,
    private calendarioService: CalendarioService,
    private eventoService: EventoService,
    private snackBar: MatSnackBar
  ) {
    this.actividadForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      evento: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split('T')[0]; // Resultado: "2025-07-02"
    const horaFormateada = hoy.toTimeString().split(' ')[0];
    this.nuevaActividad.fecha = fechaFormateada;
    this.nuevaActividad.hora = horaFormateada;
    this.calendarioService.obtenerCalendarioAutenticado().subscribe({
      next: (calendario: Calendario) => {
        this.idCalendario = calendario.id;
        this.listarActividades(); // ahora que ya tienes el ID
        this.cargarEventosDelUsuario(calendario.idUsuario);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = 'Error al obtener calendario del usuario';
        console.error(err);
      },
    });
  }

  cargarEventosDelUsuario(idUsuario: number): void {
    this.eventoService.listarEventosPorUsuario(idUsuario).subscribe({
      next: (eventos) => {
        this.listaEventos = eventos; // Ya no necesitas filtrar aquí
      },
      error: (err) => {
        console.error('Error al cargar eventos del usuario', err);
      },
    });
  }
  registrarActividad(): void {
     console.log(this.nuevaActividad);
    if (!this.idCalendario || !this.nuevaActividad.idEvento) {
    this.snackBar.open('Por favor selecciona un evento', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
    });
    return;
  }
    const actividad: ActividadCalendario = {
      idCalendario: this.idCalendario,
      idEvento: this.nuevaActividad.idEvento,
      titulo: this.actividadForm.get('titulo')?.value,   // Usamos el valor del FormControl
    descripcion: this.actividadForm.get('descripcion')?.value,
      fecha: this.nuevaActividad.fecha!,
      hora: this.nuevaActividad.hora!,
      fechaEvento: this.nuevaActividad.fechaEvento!,
    };

    if (!actividad.titulo || !actividad.descripcion) {
    this.snackBar.open('Por favor complete todos los campos de la actividad.', 'Cerrar', { duration: 3000 });
    return;
  }

    this.actividadService.registrarActividad(actividad).subscribe({
      next: () => {
        this.snackBar.open('✅ Actividad registrada', 'Cerrar', {
          duration: 2000,
          verticalPosition: 'top',
        });
        this.nuevaActividad = {
          titulo: '',
          descripcion: '',
          fecha: new Date().toISOString().split('T')[0],
          hora: new Date().toTimeString().split(' ')[0],
          idEvento: null,
          fechaEvento: '',
        };
        this.listarActividades();
      },
      error: (err) => {
        console.error('Error al registrar', err);
        this.snackBar.open('❌ Error al registrar actividad', 'Cerrar', {
          duration: 2000,
          verticalPosition: 'top',
        });
      },
    });
  }

  listarActividades(): void {
    this.actividadService
      .listarActividadesPorCalendario(this.idCalendario)
      .subscribe({
        next: (data) => {
          this.actividades = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = 'No se pudieron cargar las actividades';
          console.error(err);
        },
      });
    this.eventoService.listarEventos().subscribe({
      next: (eventos) => {
        this.listaEventos = eventos;
      },
      error: (err) => {
        console.error('Error al obtener eventos', err);
      },
    });
  }
  eliminarActividad(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta actividad?')) {
      this.actividadService.eliminarActividad(id).subscribe({
        next: () => {
          this.snackBar.open('✅ Actividad eliminada', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.listarActividades(); // recarga las actividades con el mismo idCalendario
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          this.snackBar.open('❌ Error al eliminar actividad', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'top',
          });
        },
      });
    }
  }
  onEventoSeleccionado(eventoId: number): void {
    const evento = this.listaEventos.find((e) => e.id == eventoId);

    if (evento) {
      this.nuevaActividad.idEvento = evento.id;
      this.nuevaActividad.fecha = evento.fecha; 
      this.nuevaActividad.hora = evento.hora;
      this.nuevaActividad.fechaEvento = evento.fecha;
      this.actividadForm.patchValue({
        fecha: evento.fecha,
        hora: evento.hora,
      });

      this.nuevaActividad.fechaEvento = evento.fecha; // Guardamos la fecha del evento
      // Compara solo si la fecha seleccionada es antes que la fecha del evento o la fecha actual
    }
  }
  listarEventos(): void {
    this.eventoService.listarEventosPorUsuario(this.idUsuario).subscribe({
      next: (eventos) => {
        const eventosValidos = eventos.filter((evento) => {
          const fechaActual = new Date();
          const fechaInicioEvento = new Date(evento.fecha + ' ' + evento.hora); // Fecha y hora de inicio del evento

          // Filtramos eventos cuya fecha de inicio es posterior a la fecha actual
          return fechaActual <= fechaInicioEvento;
        });

        this.listaEventos = eventosValidos;
      },
      error: (err) => {
        console.error('Error al obtener eventos', err);
      },
    });
  }
}
