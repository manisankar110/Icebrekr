import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  public readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(private authService: AuthService, private router: Router) {
    this.loadToken()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if( localStorage.getItem(this.JWT_TOKEN) != null )
      return true
      this.router.navigate(['/login'])
      return false
    //Logic of authenticating user by calling some API service.  
    // For e.g. Here Authservice has a isAuthenticated() method which further  
    // Check user is valid or not.  
  }

  async loadToken() {
    const token = localStorage.getItem(this.JWT_TOKEN);;
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
}