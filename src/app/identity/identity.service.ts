import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IActive, ILogin, IRegister } from '../Models/Account';

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
}
