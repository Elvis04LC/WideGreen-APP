import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoriaPublicacion } from '../../models/CategoriaPublicacion';
import { CategoriaPublicacionService } from '../../services/categoria-publicacion.service';

@Component({
  selector: 'app-admin-categoria-form',
  standalone: true,
  templateUrl: './admin-categorias-form.component.html',
  styleUrls: ['./admin-categorias-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AdminCategoriasFormComponent implements OnInit {
  form: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminCategoriasFormComponent>,
    private categoriaService: CategoriaPublicacionService,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaPublicacion | null
  ) {
    this.form = this.fb.group({
      nombreCategoria: ['', [Validators.required, Validators.maxLength(80)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.editMode = true;
      this.form.patchValue({ nombreCategoria: this.data.nombreCategoria });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    if (this.editMode && this.data) {
      const dto = { ...this.data, nombreCategoria: this.form.value.nombreCategoria };
      this.categoriaService.editarCategoria(dto).subscribe({
        next: () => this.dialogRef.close(true)
      });
    } else {
      this.categoriaService.crearCategoria(this.form.value).subscribe({
        next: () => this.dialogRef.close(true)
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
