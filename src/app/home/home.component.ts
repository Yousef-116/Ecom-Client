import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../shop/shop.service';
import { IProduct } from '../Models/Product';
import { ICategory } from '../Models/Category';
import { ProductParams } from '../Models/ProductParams';
import { ShopItemComponent } from '../shop/shop-item/shop-item.component';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ShopItemComponent, RouterLink, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredProducts: IProduct[] = [];
  categories: ICategory[] = [];
  
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  loadFeaturedProducts() {
    const params = new ProductParams();
    params.pageSize = 4; // Only show 4 featured products
    
    this.shopService.getProduct(params).subscribe({
      next: (response) => {
        this.featuredProducts = response.data;
      },
      error: (error) => console.log(error)
    });
  }

  loadCategories() {
    this.shopService.getCategory().subscribe({
      next: (response) => {
        this.categories = response.slice(0, 6); // Show up to 6 categories
      },
      error: (error) => console.log(error)
    });
  }
}
