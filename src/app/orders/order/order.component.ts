import { Component } from '@angular/core';
import { IOrder, IOrderItem } from '../../Models/Orders';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, DatePipe, NgClass, CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  orders: IOrder[] = [];
  getFirstImageOrderItem(order: IOrderItem[]) {
    return order.length > 0 ? order[0].mainImage : null;
  }
}
