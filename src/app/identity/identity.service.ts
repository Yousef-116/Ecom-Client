import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IActive, ILogin, IRegister, IResetPassword } from '../Models/Account';
import { cwd } from 'node:process';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  baseURL = 'http://localhost:5037/api/';
  //baseURL = 'https://localhost:7097/api/';
  constructor(private http: HttpClient) {}

  register(values: IRegister) {
    return this.http.post(this.baseURL + 'Account/register', values, {
      responseType: 'text',
    });
  }

  active(values: IActive) {
    return this.http.post(this.baseURL + 'Account/active-account', values, {
      responseType: 'text',
    });
  }

  login(values: ILogin) {
    return this.http.post(this.baseURL + 'Account/login', values, {
      responseType: 'text',
    });
  }
  //http://localhost:5037/api/Account/send-email-forget-password?email=xoxij17800%40ostahie.com
  forgotPassword(email: string) {
    let param = new HttpParams();
    console.log('Forgot password email From Identity Service ------:', email);

    param = param.append('email', email);

    return this.http.get(this.baseURL + 'Account/send-email-forget-password', {
      params: param,
      responseType: 'text',
    });
  }

  resetPassword(resetData: IResetPassword) {
    return this.http.post(this.baseURL + 'Account/reset-password', resetData, {
      responseType: 'text',
    });
  }
}
