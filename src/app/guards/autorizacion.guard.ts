import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class autorizacionGuard implements CanActivate {
  
  constructor(private router:Router, private snackBar: MatSnackBar) {}

  canActivate(): 
    | Observable <boolean | UrlTree>
    | Promise <boolean | UrlTree>
    | boolean
    | UrlTree {
      const token = localStorage.getItem('token');

      if (token) {
        return true;
      }
      else {
        this.snackBar.open('Tienes que iniciar sesión', 'Cerrar', { duration: 4000 });
        return this.router.parseUrl('/login');
      }
    }
}
