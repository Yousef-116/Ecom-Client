import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { RouterLink } from '@angular/router';
// import { IBasket, IBasketItem } from '../../shared/Models/Basket';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // constructor(private  basketService: BasketService) {}

  // basket:IBasket
  // ngOnInit(): void {
  //   this.basketService.basket$.subscribe({
  //     next:(value)=> {
  //       this.basket=value
  //     },
  //     error(err) {
  //       console.log(err);

  //     },
  //   })
  // }
  // RemoveBasket(item:IBasketItem){
  //   this.basketService.removeItemFormBasket(item)
  // }
  // incrementQuantity(item:IBasketItem){
  //   this.basketService.incrementBasketItemQuantity(item);
  // }
  // DecrementQuantity(item:IBasketItem){
  //   this.basketService.DecrementBasketItemQuantity(item);
  // }
}
