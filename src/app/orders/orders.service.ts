import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { IOrder } from '../Models/Orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(protected http: HttpClient) {}
  BaseURL = Environment.baseURL;
  getCurrentOrderForUser(id: number) {
    return this.http.get<IOrder>(
      this.BaseURL + '/Orders/get-order-by-id/' + id,
      {
        withCredentials: true,
      },
    );
  }

  getAllOrdersForUser() {
    return this.http.get<IOrder[]>(
      this.BaseURL + '/Orders/get-orders-for-user',
      {
        withCredentials: true,
      },
    );
  }
}
