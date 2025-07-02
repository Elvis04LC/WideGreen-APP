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

export const routes: Routes = [     
     { path: '', component: HomeComponent },
     { path: 'registro', component: UsuarioRegistrarComponent },
     { path: 'login', component: UsuarioLoginComponent },
     { path: 'crear-perfil', component: UsuarioPerfilCrearComponent },
     { path: 'acerca-de', component: AcercaDeComponent },
     {path: 'contactos', component: ContactosComponent},
     {
       path: '',
       component: MainLayoutComponent,
       children: [
          { path: 'home', component: UsuarioFeedComponent },
          { path: 'noticias', component: NoticiasComponent },
          { path: 'actividades', component: ActividadesComponent}

           //{ path: 'actividades', component: ActividadesComponent },
           //{ path: 'mapa', component: MapaComponent }
       ]
     },
];
