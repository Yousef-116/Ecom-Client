import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { IDelivery } from '../Shared/models/Delivery';
import { ICreateOrder, IOrder } from '../Shared/models/Orders';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseURL = Environment.baseURL;
  constructor(private http: HttpClient) { }

  updateAddress(form: any) {
    return this.http.put(this.baseURL + '/Account/address', form, {
      withCredentials: true,
    });
  }

  getAddress() {
    return this.http.get(this.baseURL + '/Account/address', {
      withCredentials: true,
    });
  }

  getDeliveryMethod() {
    return this.http.get<IDelivery[]>(
      this.baseURL + '/Orders/delivery-methods',
    );
  }

  CreateOrder(order: ICreateOrder) {
    return this.http.post<IOrder>(this.baseURL + '/Orders', order);
  }

  updateOrderStatus(orderId: number, status: number) {
    return this.http.put(`${this.baseURL}/Orders/${orderId}/status`, {
      status,
    });
  }

}


