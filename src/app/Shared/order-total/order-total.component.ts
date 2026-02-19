import { Component, OnInit } from '@angular/core';
import { IBasketTotal } from '../../Models/Basket';
import { BasketService } from '../../basket/basket.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-total',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './order-total.component.html',
  styleUrl: './order-total.component.scss',
})
export class OrderTotalComponent implements OnInit {
  basketTotal: IBasketTotal;
  constructor(private basketService: BasketService) {}
  ngOnInit(): void {
    this.basketService.basketTotal$.subscribe({
      next: (value) => {
        this.basketTotal = value;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
