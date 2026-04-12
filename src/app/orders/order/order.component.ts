import { Component, OnInit } from '@angular/core';
import { IOrder, IOrderItem } from '../../Models/Orders';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { OrdersService } from '../orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, DatePipe, NgClass, CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  constructor(
    private orderService: OrdersService,
    private toaster: ToastrService,
  ) { }
  ngOnInit(): void {
    this.orderService.getAllOrdersForUser().subscribe({
      next: (value) => {
        console.log('Get All Orders for User Done' + value);
        this.toaster.success('GET All orders Done', 'SUCCESS');
        this.orders = value;
      },
      error: (error) => {
        console.error('Get Orders failed', error);
      },
    });
  }

  urlImageModal: string[] = [];

  /**
   * Sets the images for the modal and the modal will be triggered by
   * the data-bs-toggle attribute in the HTML
   */
  openImageModal(items: IOrderItem[]) {
    // Map the order items to get an array of image strings
    this.urlImageModal = items.map((item) => item.mainImage);
  }

  orders: IOrder[] = [];
  getFirstImageOrderItem(order: IOrderItem[]) {
    return order.length > 0 ? order[0].mainImage : null;
  }

  getImageUrl(imageName: string): string {
    if (!imageName) return '';
    if (imageName.toLowerCase().startsWith('/images/')) {
      return 'http://localhost:5037' + imageName;
    }
    return imageName;
  }
}
