import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { UsuarioRegistrarComponent } from './componentes/usuario-registrar/usuario-registrar.component';
import { UsuarioLoginComponent } from './componentes/usuario-login/usuario-login.component';
import { UsuarioPerfilCrearComponent } from './componentes/usuario-perfil-crear/usuario-perfil-crear.component';

export const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'registro', component: UsuarioRegistrarComponent },
     { path: 'login', component: UsuarioLoginComponent },
     { path: 'crear-perfil', component: UsuarioPerfilCrearComponent }
];
