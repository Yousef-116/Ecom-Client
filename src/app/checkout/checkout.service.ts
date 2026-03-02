import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { IDelivery } from '../Models/Delivery';
import { ICreateOrder } from '../Models/Orders';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseURL = Environment.baseURL;
  constructor(private http: HttpClient) {}

  updateAddress(form: any) {
    return this.http.put(this.baseURL + '/Account/update-address', form);
  }

  getAddress() {
    return this.http.get(this.baseURL + '/Account/GetAddress');
  }

  getDeliveryMethod() {
    return this.http.get<IDelivery[]>(
      this.baseURL + '/Orders/delivery-methods',
    );
  }

  CreateOrder(order: ICreateOrder) {
    return this.http.post(this.baseURL + '/Orders/create-order', order);
  }

  // updateAddress(form: any) {
  //   return this.http.put(this.baseURL + '/Account/update-address', form, {
  //     withCredentials: true,
  //   });
  // }

  // updateAddress(form: an) {
  //   return this.http.put(this.baseURL + 'Account/update-address', form);
  // }
  // getAddress() {
  //   return this.http.get(this.baseURL + 'Account/get-address-for-user');
  // }
  // getDeliveryMethod() {
  //   return this.http.get<Delivery[]>(this.baseURL + 'Orders/get-delivery');
  // }
  // CreateOrder(order: ICreateOrder) {
  //   return this.http.post<IOrder>(this.baseURL + 'Orders/create-order', order);
  // }
}
