import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router, RouterLink } from '@angular/router';
import { IProduct } from '../../Models/Product';
import { CurrencyPipe } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, NgxImageZoomModule, ToastrModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  CalculateDiscountPercentage(oldPrice: number, newPrice: number) {
    if (oldPrice === 0) return 0;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100).toFixed(1);
  }
  SetBasketValue() {
    console.log('Adding to basket: ', this.product.name);
    this.basketService.addItemToBasket(this.product, this.Quantity);
    this.toastr.success('Item added to basket', 'Success');
  }
  DecreaseQuantity() {
    if (this.Quantity > 1) {
      this.Quantity--;
      this.toastr.info('Quantity decreased', 'Info');
    } else {
      this.toastr.warning('Minimum quantity reached', 'Warning');
    }
  }
  IncreaseQuantity() {
    if (this.Quantity < 10) {
      this.Quantity++;
      this.toastr.success('Quantity increased', 'Success');
    } else {
      this.toastr.warning('Maximum quantity reached', 'Warning');
    }
  }

  constructor(
    private shopService: ShopService,
    private router: Router,
    private toastr: ToastrService,
    private basketService: BasketService,
  ) {}
  id: number;
  product: IProduct;
  MainImage: string;
  Quantity: number = 1;
  ngOnInit(): void {
    this.id = parseInt(this.router.url.split('/').pop() || '');
    this.loadProduct(this.id);
  }

  loadProduct(id: number) {
    this.shopService.getProductDetails(id).subscribe({
      next: (value: IProduct) => {
        this.product = value;
        this.MainImage = value.photos[0].imageName;
      },
    });
  }

  ReplaceImage(image: string) {
    this.MainImage = image;
  }
}
