import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import jsPDF from 'jspdf';
import { InscripcionEventoService } from '../../services/inscripcion-evento.service';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CategoriaConteoService } from '../../services/categoria-conteo.service';
import { UsuarioService } from '../../services/usuario.service';
type ReporteKey = 'inscripcionesEvento' | 'publicacionesCategoria' | 'usuariosRegistrados';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
    MatFormFieldModule,
    FormsModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})

export class EstadisticasComponent implements OnInit {
  
  reporteSeleccionado: ReporteKey | null = null;
  displayedColumns: string[] = ['evento', 'inscritos'];
  dataSource: any[] = [];
  reportesDisponibles = [
    {
      value: 'inscripcionesEvento',
      label: 'Cantidad de Inscripciones por Evento',
    },
    {
      value: 'publicacionesCategoria',
      label: 'Publicaciones por Categoría',
    },
    {
      value: 'usuariosRegistrados',
      label: 'Usuarios Registrados por Mes',
    },
  ];
  constructor(
    private inscripcionService: InscripcionEventoService,
    private categoriaConteoService: CategoriaConteoService,
    private usuarioService: UsuarioService
  ) {}

  //DIAGRAMA DE BARRAS CANTIDAD DE INSCRIPCIONES
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Inscripciones' }],
  };

  public nombresEventos: string[] = [];
  public inscripcionesPorEvento: number[] = [];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Inscripciones por Evento' },
    },
  };
  //DIAGRAMA CIRCULAR CATEGORIA CONTEO
  public categorias: string[] = [];
  public cantidadPorCategoria: number[] = [];
  public pieChartData: any = { labels: [], datasets: [{ data: [] }] };
  public pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      title: { display: true, text: 'Publicaciones por Categoría' },
    },
  };
  public displayedColumnsCategoria: string[] = ['categoria', 'cantidad'];
  public dataSourceCategoria: any[] = [];

  //DIAGRAMA DE LINEAS DE USUARIO POR MES
  public meses: string[] = [];
  public usuariosPorMes: number[] = [];
  public lineChartData: any = {
    labels: [],
    datasets: [
      { data: [], label: 'Usuarios Registrados', fill: true, tension: 0.3 },
    ],
  };
  public lineChartOptions: any = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Usuarios Registrados por Mes' },
    },
  };
  public displayedColumnsUsuarios: string[] = ['mes', 'cantidad'];
  public dataSourceUsuarios: any[] = [];

  ngOnInit(): void {
    // Por defecto, no carga ningún gráfico hasta que el admin seleccione el reporte.
  }

  cambiarReporte(): void {
    if (this.reporteSeleccionado === 'inscripcionesEvento') {
      this.cargarInscripcionesPorEvento();
    } else if (this.reporteSeleccionado === 'publicacionesCategoria') {
      this.cargarPublicacionesPorCategoria();
    } else if (this.reporteSeleccionado === 'usuariosRegistrados') {
      this.cargarUsuariosPorMes();
    } else {
      // Limpia todos los gráficos
      this.barChartData = { labels: [], datasets: [{ data: [], label: '' }] };
      this.pieChartData = { labels: [], datasets: [{ data: [] }] };
      this.lineChartData = { labels: [], datasets: [{ data: [], label: '' }] };
    }
  }
  cargarUsuariosPorMes(): void {
    this.usuarioService.usuariosPorMes().subscribe((data) => {
      this.meses = data.map((d) => d.mes);
      this.usuariosPorMes = data.map((d) => d.cantidad);

      // Gráfico de líneas
      this.lineChartData = {
        labels: this.meses,
        datasets: [
          {
            data: this.usuariosPorMes,
            label: 'Usuarios Registrados',
            fill: true,
            tension: 0.3,
            pointRadius: 6,
            borderWidth: 3,
          },
        ],
      };

      // Tabla
      this.dataSourceUsuarios = data.map((d) => ({
        mes: d.mes,
        cantidad: d.cantidad,
      }));
    });
  }
  cargarPublicacionesPorCategoria(): void {
    this.categoriaConteoService
      .obtenerCantidadPorCategoria()
      .subscribe((data) => {
        this.categorias = data.map((d) => d.categoria);
        this.cantidadPorCategoria = data.map((d) => d.cantidad);

        // Pie Chart
        this.pieChartData = {
          labels: this.categorias,
          datasets: [{ data: this.cantidadPorCategoria }],
        };

        // Tabla
        this.dataSourceCategoria = data.map((d) => ({
          categoria: d.categoria,
          cantidad: d.cantidad,
        }));
      });
  }
  cargarInscripcionesPorEvento(): void {
    this.inscripcionService.contarPorEvento().subscribe((data) => {
      this.nombresEventos = data.map((d) => d.nombre);
      this.inscripcionesPorEvento = data.map((d) => d.totalI);

      this.barChartData = {
        labels: this.nombresEventos,
        datasets: [
          { data: this.inscripcionesPorEvento, label: 'Inscripciones' },
        ],
      };

      // Tabla: preparamos el datasource
      this.dataSource = data.map((d) => ({
        evento: d.nombre,
        inscritos: d.totalI,
      }));
    });
  }

  generarPDF(): void {
    // se agregará luego
  }
}
