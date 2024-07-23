import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router : Router) { }
  canActivate(): boolean {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
