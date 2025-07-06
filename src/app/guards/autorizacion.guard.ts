import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const autorizacionGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('jwtToken');

  if(token) {
    return true;
  }
  else {
    const snackBar = inject(MatSnackBar);
    const router = inject(Router);

    snackBar.open('Tienes que iniciar sesión', 'Cerrar', {
      duration: 4000
    });

    return router.parseUrl('/login');
  }
};
