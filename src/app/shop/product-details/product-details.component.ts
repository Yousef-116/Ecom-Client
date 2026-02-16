import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
import { IProduct } from '../../Models/Product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
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
  ngOnInit(): void {
    this.id = parseInt(this.router.url.split('/').pop() || '');
    this.loadProduct(this.id);
  }

  loadProduct(id: number) {
    this.shopService.getProductDetails(id).subscribe({
      next: (value: IProduct) => {
        this.product = value;
      },
    });
  }
}
