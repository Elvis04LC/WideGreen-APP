import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { UsuarioRegistrarComponent } from './componentes/usuario-registrar/usuario-registrar.component';
import { UsuarioLoginComponent } from './componentes/usuario-login/usuario-login.component';
import { UsuarioPerfilCrearComponent } from './componentes/usuario-perfil-crear/usuario-perfil-crear.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UsuarioFeedComponent } from './componentes/usuario-feed/usuario-feed.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ContactosComponent } from './componentes/contactos/contactos.component';
import { ActividadesComponent } from './componentes/actividades/actividades.component';
import { UsuarioPerfilComponent } from './componentes/usuario-perfil/usuario-perfil.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';
import { MapaDistritosComponent } from './componentes/mapa-distritos/mapa-distritos.component';
import { NuestroEquipoComponent } from './componentes/nuestro-equipo/nuestro-equipo.component';
import { ForoComponent } from './componentes/foro/foro.component';
import { NotificacionesComponent } from './componentes/notificaciones/notificaciones.component';
import { autorizacionGuard } from './guards/autorizacion.guard';

import { AdminCategoriasComponent } from './componentes/admin-categorias/admin-categorias.component';
import { AdminGuard } from './guards/admin.guard';
import { perfilCrearGuard } from './guards/perfil-crear.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'registro', component: UsuarioRegistrarComponent },
  { path: 'login', component: UsuarioLoginComponent },
  { path: 'crear-perfil', component: UsuarioPerfilCrearComponent, canActivate: [perfilCrearGuard] },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: 'nuestro-equipo', component: NuestroEquipoComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [autorizacionGuard],
    children: [
      { path: 'home', component: UsuarioFeedComponent },
      { path: 'noticias', component: NoticiasComponent },
      { path: 'actividades', component: ActividadesComponent },
      { path: 'perfil', component: UsuarioPerfilComponent },
      { path: 'eventos', component: EventosComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent,
          canActivate: [AdminGuard],
      },
      {
        path: 'admin-categorias',
        component: AdminCategoriasComponent, // o loadComponent: () => import... si usas lazy
        canActivate: [AdminGuard], // Opcional: protege con guardia de admin
      },
      { path: 'mapa', component: MapaDistritosComponent },
      { path: 'foro', component: ForoComponent },
      {
        path: 'notificaciones',
        component: NotificacionesComponent,
      },
    ],
  },
];
