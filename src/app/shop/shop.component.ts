import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IPagination } from '../shared/models';
import { IProduct } from '../shared/models';
import { CommonModule } from '@angular/common';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ICategory } from '../shared/models';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProductParams } from '../shared/models';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ShopItemComponent, FormsModule, PaginationModule, CommonModule],

  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (params['categoryId']) {
          this.productParam.SelectedCategoryId = +params['categoryId'];
          // Remove the query parameter from the URL
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { categoryId: null },
            queryParamsHandling: 'merge'
          });
        }
        this.getAllProduct();
      },
      error: (error) => {
        this.tost.error('Failed to load products', 'ERROR');
        console.log(error);
      },
    });
    this.getCategory();
  }
  constructor(
    private shopService: ShopService,
    private tost: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  //Get All Product
  ListProduct: IProduct[];
  productParam = new ProductParams();
  totalCount: number;
  //Product: IProduct;
  getAllProduct() {
    console.log("---------------------------------**--" + this.productParam.SelectedCategoryId);
    this.shopService.getProduct(this.productParam).subscribe({
      next: (value: IPagination) => {
        this.ListProduct = value.data;
        this.totalCount = value.totalCount;
        // this.tost.success('Products Loaded Successfully', 'SUCCESS');
      },
    });
  }
  //OnChangePage
  OnChangePage(event: any) {
    //if (this.productParam.pageNumber != event) {
    this.productParam.pageNumber = event.page;
    this.getAllProduct();
    // console.log(event);
    //}
  }

  //Get Category
  ListCategory: ICategory[];
  getCategory() {
    this.shopService.getCategory().subscribe({
      next: (value: ICategory[]) => {
        this.ListCategory = value;
        console.log('Categories loaded:', this.ListCategory); // Add this line
        console.log('First category:', this.ListCategory[0]); // Add this line
      },
    });
  }

  SortingOption = [
    { name: 'Name', value: 'Name' },
    { name: 'Price:min-max', value: 'PriceAsn' },
    { name: 'Price:max-min', value: 'PriceDes' },
  ];
  SelectCategory(categoryId: number) {
    console.log("===========" + categoryId);
    this.productParam.SelectedCategoryId = categoryId;
    this.productParam.pageNumber = 1; // ✅
    this.getAllProduct();
  }

  Sort(e: any) {
    this.productParam.SortSelected = (e.target as HTMLSelectElement).value;
    this.productParam.pageNumber = 1; // ✅
    this.getAllProduct();
  }

  OnSearch() {
    this.productParam.pageNumber = 1; // ✅
    this.getAllProduct();
  }
  ResetValue() {
    this.productParam.Search = '';
    this.productParam.SortSelected = this.SortingOption[0].value;
    this.productParam.SelectedCategoryId = 0;
    this.getAllProduct();
  }

  //pagination
  get startItem(): number {
    return (this.productParam.pageNumber - 1) * this.productParam.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(
      this.productParam.pageNumber * this.productParam.pageSize,
      this.totalCount,
    );
  }
}
