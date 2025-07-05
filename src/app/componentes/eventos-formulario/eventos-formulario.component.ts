import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  ValidatorFn
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EventoService } from '../../services/evento.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TipoEventoService } from '../../services/tipo-evento.service';
import { TipoEvento } from '../../models/TipoEvento';
import { NotificacionService } from '../../services/notificacion.service';
import { MapaDistritoService } from '../../services/mapa-distrito.service';
import { MapaDistrito } from '../../models/MapaDistrito';
import { map, Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-eventos-formulario',
  standalone: true,
  templateUrl: './eventos-formulario.component.html',
  styleUrls: ['./eventos-formulario.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
   MatCard,
   MatCardContent,
   MatCardTitle
  ]
})
export class EventosFormularioComponent implements OnInit {
  eventoForm: FormGroup;
  tiposEvento: TipoEvento[] = [];
  distritos: MapaDistrito[] = [];
  distritosFiltrados!: Observable<MapaDistrito[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EventosFormularioComponent>,
    private eventoService: EventoService,
    private tipoEventoService: TipoEventoService,
    private snackBar: MatSnackBar,
    private notificacionService: NotificacionService,
    private mapaDistritoService: MapaDistritoService
  ) {
    this.eventoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fecha: ['', [Validators.required, this.fechaNoFuturaValidator]],
      hora: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      idTipoEvento: ['', [Validators.required]],
    },{
  validators: [this.horaValidaSiEsHoy()]
});
  }

  ngOnInit(): void {

    this.eventoForm.get('fecha')?.valueChanges.subscribe(() => {
  this.eventoForm.get('hora')?.updateValueAndValidity();
});
    // Cargar tipos de evento
    this.tipoEventoService.listarTipos().subscribe({
      next: (data) => this.tiposEvento = data,
      error: () => this.snackBar.open('❌ No se pudieron cargar los tipos de evento', 'Cerrar', {
        duration: 2000,
      }),
      
    });

    // Cargar distritos
    this.mapaDistritoService.obtenerDistritos().subscribe({
      next: (data) => {
        this.distritos = data;

        // Filtrado reactivo del autocomplete
        this.distritosFiltrados = this.eventoForm.get('ubicacion')!.valueChanges.pipe(
          startWith(''),
          map((valor) => this._filtrarDistritos(valor || ''))
        );
      },
      error: () => this.snackBar.open('❌ No se pudieron cargar los distritos', 'Cerrar', {
        duration: 2000,
      }),
    });
  }

  // Validación personalizada: fecha no puede ser pasada
  fechaNoFuturaValidator(control: AbstractControl): ValidationErrors | null {
    const fecha = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fecha >= hoy ? null : { fechaFutura: true };
  }

horaValidaSiEsHoy(): ValidationErrors | null {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const fechaCtrl = formGroup.get('fecha');
    const horaCtrl = formGroup.get('hora');

    if (!fechaCtrl || !horaCtrl || !fechaCtrl.value || !horaCtrl.value) return null;

    const fecha = new Date(fechaCtrl.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    fecha.setHours(0, 0, 0, 0);

    const esHoy = fecha.getTime() === hoy.getTime();
    if (!esHoy) return null;

    const horaIngresada = horaCtrl.value;
    const [hh, mm] = horaIngresada.split(':').map(Number);
    const horaActual = new Date();
    const horaIngresadaDate = new Date();
    horaIngresadaDate.setHours(hh, mm, 0, 0);

    if (horaIngresadaDate <= horaActual) {
      horaCtrl.setErrors({ horaInvalida: true });
      return { horaInvalida: true };
    } else {
      // Limpia el error si antes fue inválida
      if (horaCtrl.hasError('horaInvalida')) {
        horaCtrl.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      }
      return null;
    }
  };
}
  // Filtrado de distritos para el autocomplete
  private _filtrarDistritos(valor: string): MapaDistrito[] {
    const texto = valor.toLowerCase();
    return this.distritos.filter((d) =>
      d.nombreDistrito.toLowerCase().includes(texto)
    );
  }

  // Registro de evento con validación de formulario
  registrarEvento(): void {
    if (this.eventoForm.invalid) {
      this.eventoForm.markAllAsTouched(); // <-- activa todos los errores visuales
      return;
    }

    this.eventoService.crearEvento(this.eventoForm.value).subscribe({
      next: () => {
        this.snackBar.open('✅ Evento creado correctamente', 'Cerrar', {
          duration: 2000,
        });
        this.notificacionService.obtenerMisNotificaciones().subscribe();
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('❌ Error al registrar evento', 'Cerrar', {
          duration: 2000,
        });
      },
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}