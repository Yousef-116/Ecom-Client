import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IActive,
  IAuthResponse,
  ILogin,
  IRegister,
  IResetPassword,
} from '../Models/Account';
import { cwd } from 'node:process';
import { Environment } from '../environment';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  //baseURL = 'http://localhost:5037/api/';
  //baseURL = 'https://localhost:7097/api/';
  baseURL = Environment.baseURL;
  constructor(private http: HttpClient) {}

  register(values: IRegister) {
    return this.http.post(this.baseURL + '/Account/Register', values, {
      responseType: 'text',
    });
  }

  active(values: IActive) {
    console.log('Sending activation request with:', values);
    return this.http
      .post(this.baseURL + '/Account/active-account', values, {
        responseType: 'text',
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error('Activation error:', error);
          console.error('Error details:', error.error);
          return throwError(() => error);
        }),
      );
  }

  login(values: ILogin) {
    return this.http.post<IAuthResponse>(
      this.baseURL + '/Account/Login',
      values,
      {
        withCredentials: true,
      },
    );
  }

  //http://localhost:5037/api/Account/send-email-forget-password?email=xoxij17800%40ostahie.com
  forgotPassword(email: string) {
    let param = new HttpParams();
    console.log('Forgot password email From Identity Service ------:', email);

    param = param.append('email', email);

    return this.http.get(this.baseURL + '/Account/send-email-forget-password', {
      params: param,
      responseType: 'text',
    });
  }

  resetPassword(resetData: IResetPassword) {
    return this.http.post(this.baseURL + '/Account/reset-password', resetData, {
      responseType: 'text',
    });
  }

  private userNameSource = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSource.asObservable();

  // Set user name
  setUserName(name: string | null) {
    this.userNameSource.next(name);
  }

  // Clear user
  clearUser() {
    this.userNameSource.next(null);
  }

  isAuthenticated() {
    return this.http.get(this.baseURL + '/Account/IsUserAuth', {
      withCredentials: true,
      responseType: 'text'
    });
  }

  loadUserName() {
    this.http
      .get(this.baseURL + '/Account/get-user-name', { withCredentials: true })
      .subscribe({
        next: (res) => {
          console.log('Full loadUserName response:', res); // 👈 Add this log
          // Check the actual response structure
          if (res && typeof res === 'object') {
            // Try different possible structures
            const userName =
              (res as any).data ||
              (res as any).userName ||
              (res as any).name ||
              null;
            this.userNameSource.next(userName);
          } else {
            this.userNameSource.next(null);
          }
        },
        error: (err) => {
          console.error('Error loading user name:', err);
          this.userNameSource.next(null);
        },
      });
  }

  logout() {
    return this.http
      .get(this.baseURL + '/Account/Logout', { withCredentials: true })
      .pipe(
        tap(() => {
          this.userNameSource.next(null);
        }),
      );
  }
}
