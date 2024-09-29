import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredImportance = route.data['importance'] as number;

    if (this.authService.isAuthenticated()) {
 
      if (this.authService.hasImportance(requiredImportance)) {
        return true;
      } else {
        alert("Vous n'avez pas les droits nécessaires pour accéder à cette page.");
        this.router.navigate(['/forbidden']);  
        return false;
      }
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}