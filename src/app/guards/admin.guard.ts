import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

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
    if (payload.role === 'ADMIN' || payload.role === 'ROLE_ADMIN') {
      return true;
    }
  } catch (e) {
    router.navigate(['/login']);
    return false;
  }

  router.navigate(['/']);
  return false;
};
