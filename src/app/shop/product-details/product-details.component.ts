import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
import { IProduct } from '../../Models/Product';
import { CurrencyPipe } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, NgxImageZoomModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private router: Router,
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
