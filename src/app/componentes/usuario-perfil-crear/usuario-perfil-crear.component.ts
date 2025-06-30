import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioPerfilCrearService } from '../../services/usuario-perfil-crear.service';

@Component({
  selector: 'app-usuario-perfil-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule],
  templateUrl: './usuario-perfil-crear.component.html',
  styleUrl: './usuario-perfil-crear.component.css'
})
export class UsuarioPerfilCrearComponent {
  perfilForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private perfilService: UsuarioPerfilCrearService
  ) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      foto: [''],
      bio: ['']
    });
  }


  registrarPerfil() {
    if (this.perfilForm.valid) {
      const perfil = this.perfilForm.value;
      this.perfilService.registrarPerfil(perfil).subscribe({
        next: () => alert('¡Perfil creado exitosamente!'),
        error: () => alert('Error al registrar perfil')
      });
    }
  }
}
