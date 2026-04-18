import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../orders.service';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { OrderTotalComponent } from '../../shared/order-total/order-total.component';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent implements OnInit {
  order: IOrder;
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.id = +param['id'];

      this.orderService.getCurrentOrderForUser(this.id).subscribe({
        next: (value) => {
          console.log('Get Order Done', value);
          this.order = value;
        },
        error: (error) => {
          console.error('Get Order failed', error);
        },
      });
    });
  }

  getImageUrl(imageName: string): string {
    if (!imageName) return '';
    if (imageName.toLowerCase().startsWith('/images/')) {
      return 'http://localhost:5037' + imageName;
    }
    return imageName;
  }
}


