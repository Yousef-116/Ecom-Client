import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../Models/Product';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [CurrencyPipe, RouterModule, ToastrModule],
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent {
  @Input({ required: true }) product!: IProduct;

  constructor(
    private service: BasketService,
    private toastr: ToastrService,
  ) {}
  SetBasketValue() {
    console.log('Adding to basket: ', this.product.name);
    this.service.addItemToBasket(this.product);
    this.toastr.success('Item added to basket', 'Success');
  }
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
