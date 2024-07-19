import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtPayload, Login, TokenDTO, UserToken } from '../../type/login';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private router = inject(Router);
  private isLogged = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLogged.asObservable();

  constructor() {
    this.checkToken();
  }

  login(loginForm: Login): Observable<UserToken> {
    return this._http
      .post<UserToken>(`/api/Authentication/login`, loginForm)
      .pipe(
        tap((token: UserToken) => {
          localStorage.setItem('token', token.token);
          this.isLogged.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('appointments');
    localStorage.removeItem('numberAppointments');
    this.isLogged.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  checkToken(): void {
    const token = this.getToken();

    if (token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  decodeToken(token: string): JwtPayload {
    return jwtDecode(token) as JwtPayload;
  }

  getTokenInfo(): TokenDTO {
    const token = this.getToken();
    if (token == null) {
      throw console.error();
    }
    const decoded_token = this.decodeToken(token);
    const id =
      decoded_token[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'
      ];
    const name =
      decoded_token[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    const email =
      decoded_token[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];
    const birthDate = decoded_token['birthDate'];

    const token_info: TokenDTO = {
      idPatient: Number(id),
      name: name,
      email: email,
      birthDate: birthDate,
    };

    return token_info;
  }

  checkIsTokenExpiring(): void {
    const token = this.getToken();

    if (!token) return;

    const currentTime = Math.floor(Date.now() / 1000);
    const decodedToken = this.decodeToken(token);

    if (!decodedToken.exp) return;

    const timeRemaining = decodedToken.exp - currentTime;

    if (timeRemaining > 0 && timeRemaining < 180) {
      this.refreshToken().subscribe();
    }
  }

  refreshToken():Observable<UserToken> {
    return this._http.get<UserToken>(`/api/Authentication/refreshToken`).pipe(
      tap((token: UserToken) => {
        localStorage.setItem('token', token.token);
      })
    );
  }
}
