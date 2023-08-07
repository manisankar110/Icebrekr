import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  private isUserAuthorizedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  isUserAuthorizedObs = this.isUserAuthorizedSubject.asObservable();

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild() {
    return this.canActivate();
  }
  setIsUserAuthorizedState(state: boolean) {
    this.isUserAuthorizedSubject.next(state);
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      this.setIsUserAuthorizedState(false);
      this.router.navigateByUrl('/login')
    } else if (this.authService.isLoggedIn()) {
      this.setIsUserAuthorizedState(true);
    }

    return this.authService.isLoggedIn();
  }
}
