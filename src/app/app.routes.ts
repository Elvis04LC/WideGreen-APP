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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro', component: UsuarioRegistrarComponent },
  { path: 'login', component: UsuarioLoginComponent },
  { path: 'crear-perfil', component: UsuarioPerfilCrearComponent },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: 'contactos', component: ContactosComponent},
  { path: 'nuestro-equipo', component:  NuestroEquipoComponent},
   
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: UsuarioFeedComponent },
      { path: 'noticias', component: NoticiasComponent },
      { path: 'actividades', component: ActividadesComponent },
      { path: 'perfil', component: UsuarioPerfilComponent },
      {
        path: 'eventos',
        component: EventosComponent,
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
      },
      { path: 'mapa', component: MapaDistritosComponent}
    ],
  },
];
