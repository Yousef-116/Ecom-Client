import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../Shared/models/Product';
import { CommonModule } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';

import { RatingComponent } from './rating/rating.component';
import { ShopItemComponent } from '../shop-item/shop-item.component';
import { ProductParams } from '../../Shared/models/ProductParams';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    NgxImageZoomModule,
    ToastrModule,
    RouterLink,
    RatingComponent,
    ShopItemComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  averageRating: number = 0;
  reviewsCount: number = 0;

  onRatingChanged(event: any) {
    this.averageRating = event.avg;
    this.reviewsCount = event.count;
  }

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
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private basketService: BasketService,
  ) { }
  id: number;
  product: IProduct;
  relatedProducts: IProduct[] = [];
  MainImage: string;
  Quantity: number = 1;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.loadProduct(this.id);
    });
  }

  loadProduct(id: number) {
    this.shopService.getProductDetails(id).subscribe({
      next: (value: IProduct) => {
        this.product = value;
        this.MainImage = value.photos[0].imageName;
        this.loadRelatedProducts(value.categoryId);
      },
    });
  }

  loadRelatedProducts(categoryId: number) {
    const params = new ProductParams();
    params.SelectedCategoryId = categoryId;
    params.pageSize = 4;
    this.shopService.getProduct(params).subscribe({
      next: (response) => {
        // Filter out the current product from related products
        this.relatedProducts = response.data
          .filter((p) => p.id !== this.id)
          .slice(0, 4);
      },
    });
  }

  ReplaceImage(image: string) {
    this.MainImage = '';
    setTimeout(() => {
      this.MainImage = image;
    }, 50);
  }

  getImageUrl(imageName: string): string {
    if (!imageName) return '';
    if (imageName.toLowerCase().startsWith('/images/')) {
      return 'http://localhost:5037' + imageName;
    }
    return imageName;
  }
}


