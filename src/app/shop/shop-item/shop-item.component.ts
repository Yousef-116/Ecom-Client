import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../Models/Product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [CurrencyPipe, RouterModule],
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent {
  @Input({ required: true }) product!: IProduct;

  //   constructor(private _service: BasketService) {}
  //   @Input() Product: IProduct;
  //   SetBasketValue() {
  //     this._service.addItemToBasket(this.Product);
  //   }
  //   getArrayofRating(rateOfnumber:number):number[]{
  //     return Array(rateOfnumber).fill(0).map((x,i)=>i);
  //   }
  // }
}
