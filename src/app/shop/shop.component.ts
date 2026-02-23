import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IPagnation } from '../Models/Pagnation';
import { IProduct } from '../Models/Product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ICategory } from '../Models/Category';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProductParams } from '../Models/ProductParams';
import { ToastrService } from 'ngx-toastr';
import { cwd } from 'node:process';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ShopItemComponent, FormsModule, PaginationModule, CommonModule],

  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  ngOnInit(): void {
    try {
      this.getAllProduct();
    } catch (error) {
      this.tost.error('Failed to load products', 'ERROR');
      console.log(error);
    }
    this.getCategory();
  }
  constructor(
    private shopService: ShopService,
    private tost: ToastrService,
  ) {}

  //Get All Product
  ListProduct: IProduct[];
  productParam = new ProductParams();
  totalCount: number;
  //Product: IProduct;
  getAllProduct() {
    this.shopService.getProduct(this.productParam).subscribe({
      next: (value: IPagnation) => {
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
      },
    });
  }

  SelectCategory(categoryId: number) {
    this.productParam.SelectedCategoryId = categoryId;
    this.getAllProduct();
    console.log(categoryId);
  }

  SortingOption = [
    { name: 'Name', value: 'Name' },
    { name: 'Price:min-max', value: 'PriceAsn' },
    { name: 'Price:max-min', value: 'PriceDes' },
  ];

  Sort(e: any) {
    this.productParam.SortSelected = (e.target as HTMLSelectElement).value;
    this.getAllProduct();
  }

  //Search Product

  OnSearch() {
    //console.log(this.Search);
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

// ngOnInit(): void {
//   this.ProductParam.SortSelected = this.SortingOption[0].value;
//   this.getAllProduct();
//   this.getCategory();
// }

// category: Icategory[];
// TotatlCount: number;
// ProductParam = new ProductParam();

// getAllProduct() {
//   this.shopService.getProduct(this.ProductParam).subscribe({
//     next: (value: IPagnation) => {
//       this.product = value.data;
//       this.TotatlCount = value.totalCount;
//       this.ProductParam.pageNumber = value.pageNumber;
//       this.ProductParam.pageSize = value.pageSize;
//       this.toast.success('Product Loaded Successfully', 'SUCCESS');
//     },
//   });
// }

// OnChangePage(event: any) {
//   if (this.ProductParam.pageNumber != event) {
//     this.ProductParam.pageNumber = event;
//     console.log(event);

//     this.getAllProduct();
//   }
// }
// getCategory() {
//   this.shopService.getCategory().subscribe({
//     next: (value) => {
//       this.category = value;
//     },
//   });
// }

// SelectedId(categoryid: number) {
//   this.ProductParam.CategoryId = categoryid;
//   this.ProductParam.pageNumber = 1;
//   this.getAllProduct();
// }

// SortingOption = [
//   { name: 'Price', value: 'Name' },
//   { name: 'Price:min-max', value: 'PriceAce' },
//   { name: 'Price:max-min', value: 'PriceDce' },
// ];

// SortingByPrice(sort: Event) {
//   this.ProductParam.SortSelected = (sort.target as HTMLSelectElement).value;
//   this.getAllProduct();
// }

// OnSearch(Search: string) {
//   this.ProductParam.search = Search;
//   this.getAllProduct();
// }
// @ViewChild('search') searchInput: ElementRef; // Reference to the search input element
// @ViewChild('SortSelected') selected: ElementRef; // Reference to the sorting select element

// // Reset all values
// ResetValue() {
//   this.ProductParam.search = '';
//   this.ProductParam.SortSelected = this.SortingOption[0].value;
//   this.ProductParam.CategoryId = 0;

//   this.searchInput.nativeElement.value = '';

//   this.selected.nativeElement.selectedIndex = 0;

//   this.getAllProduct();
// }
