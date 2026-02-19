import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { RouterLink } from '@angular/router';
import { IBasket, IBasketItem } from '../../Models/Basket';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { async, asyncScheduler, Observable } from 'rxjs';
// import { IBasket, IBasketItem } from '../../shared/Models/Basket';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  removeItem(item: IBasketItem) {
    this.basketService.removeItemFormBasket(item);
  }
  decrementQuantity(item: IBasketItem) {
    this.basketService.DecrementBasketItemQuantity(item);
  }
  incrementQuantity(item: IBasketItem) {
    this.basketService.incrementBasketItemQuantity(item);
  }

  constructor(private basketService: BasketService) {}
  basket$!: Observable<IBasket | null>;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }
}
