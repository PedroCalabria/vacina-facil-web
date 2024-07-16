import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { JwtPayload, Login, TokenDTO, UserToken } from '../../type/login';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private router = inject(Router);
  private isLogged = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLogged.asObservable();

  constructor() {
    this.checkToken();
  }

  login(loginForm: Login) {
    console.log('login')
    return this._http
      .post<UserToken>(`/api/Authentication/login`, loginForm)
      .pipe(
        tap((token: UserToken) => {
          console.log('pipe')
          console.log(loginForm)
          localStorage.setItem('token', token.token);
          this.isLogged.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged.next(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  checkToken() {
    const token = this.getToken();

    if (token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  decodeToken(token: string): JwtPayload{
    return jwtDecode(token) as JwtPayload;
  }

  getTokenInfo(token: string): TokenDTO {
    const decoded_token = this.decodeToken(token);
    const name =
      decoded_token[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    const email =
      decoded_token[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];

    const token_info: TokenDTO = {
      name: name,
      email: email
    };

    return token_info;
  }
}

