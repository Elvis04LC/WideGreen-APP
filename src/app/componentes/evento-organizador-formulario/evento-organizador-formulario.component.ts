import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { EventoService } from '../../services/evento.service';
import { OrganizadorEventoService } from '../../services/organizador-evento.service';
import { MatOptionModule } from '@angular/material/core';
import { EventoOrganizadorService } from '../../services/evento-organizador.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-evento-organizador-formulario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatOptionModule,
  ],
  templateUrl: './evento-organizador-formulario.component.html',
  styleUrls: ['./evento-organizador-formulario.component.css'],
})
export class EventoOrganizadorFormularioComponent implements OnInit {
  form: FormGroup;
  eventos: any[] = [];
  organizadores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private organizadorService: OrganizadorEventoService,
    private eventoOrganizadorService: EventoOrganizadorService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EventoOrganizadorFormularioComponent>
  ) {
    this.form = this.fb.group({
      idEvento: ['', Validators.required],
      idOrganizador: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventoService
      .listarEventos()
      .subscribe((data) => (this.eventos = data));
    this.organizadorService
      .listarOrganizadores()
      .subscribe((data) => (this.organizadores = data));
  }

  asociar(): void {
    if (this.form.invalid) return;

    this.eventoOrganizadorService.registrar(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Organizador asociado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.dialogRef.close(); // 👈 Esto cierra el diálogo
      },
      error: () => {
        this.snackBar.open('Error al asociar organizador', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
cancelar(): void {
  this.dialogRef.close();
}
}
