import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, mapTo, tap, map } from 'rxjs/operators';
import { Tokens } from '../models/token';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public readonly JWT_TOKEN = 'JWT_TOKEN';
  public readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  public readonly EXPIRES_IN = 'EXPIRES_IN';

  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };

  apiUrl = `${environment.serverUrl}`;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.access_token);
    localStorage.setItem(this.EXPIRES_IN, tokens.expires_in);
  }

  // login token
  loginToken(data:any): Observable<Tokens> {
    return this.http.post<any>('https://a0ab9a38-098a-4ba7-86ec-2dd779d0bd61.mock.pstmn.io/login?userName=' + data.username + '&password=' + data.password ,{}).pipe(tap((res: any) => {
      this.storeTokens(res)
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.EXPIRES_IN);
    this.router.navigate(['/login']);
  }

 

}
