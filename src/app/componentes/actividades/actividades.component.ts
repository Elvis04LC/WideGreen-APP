import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-actividades',
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {

}
