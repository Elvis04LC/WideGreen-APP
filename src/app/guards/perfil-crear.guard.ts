import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export const perfilCrearGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');

  if(token){
    return true;
  }
  else {
    const snackBar = inject(MatSnackBar);
    const router = inject (Router);

    snackBar.open('Debes registrarte antes de crear un perfil', 'Cerrar', {
      duration: 4000,
    });

    return router.parseUrl('/registro');
  }
};
