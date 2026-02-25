import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { RouterLink } from '@angular/router';
import { IBasket, IBasketItem } from '../../Models/Basket';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { async, asyncScheduler, Observable } from 'rxjs';
import { OrderTotalComponent } from '../../Shared/order-total/order-total.component';
// import { IBasket, IBasketItem } from '../../shared/Models/Basket';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule, OrderTotalComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  constructor(private basketService: BasketService) {}
  basket$!: Observable<IBasket | null>;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeItem(item: IBasketItem) {
    this.basketService.removeItemFormBasket(item);
  }
  decrementQuantity(item: IBasketItem) {
    this.basketService.DecrementBasketItemQuantity(item);
  }
  incrementQuantity(item: IBasketItem) {
    this.basketService.incrementBasketItemQuantity(item);
  }
}
