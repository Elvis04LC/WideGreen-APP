import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const AdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Intenta obtener el token del localStorage
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const snackBar = inject(MatSnackBar);
    if (payload.role === 'ADMIN' || payload.role === 'ROLE_ADMIN') {
      return true;
    }
    if (payload.role == 'USER' || payload.role == 'ROLE_USER') {
      snackBar.open('El usuario no tiene permitido ingresar a esta opción', 'Cerrar',{ duration: 5000 });
      return router.navigate(['/home']);
      //router.navigate(['/home']);
      //return true;
    }
  } catch (e) {
    router.navigate(['/login']);
    return false;
  }
  router.navigate(['/']);
  return false;
};
