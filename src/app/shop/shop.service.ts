import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/Product';
import { ICategory } from '../Models/Category';
import { ProductParams } from '../Models/ProductParams';
import { IPagination } from '../Models/Pagination';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) { }

  baseURL = Environment.baseURL;

  getProduct(productParam: ProductParams) {
    let param = new HttpParams();

    if (productParam.SelectedCategoryId) {
      param = param.append('CategoryId', productParam.SelectedCategoryId);
    }
    if (productParam.SortSelected) {
      param = param.append('Sort', productParam.SortSelected);
    }
    if (productParam.Search) {
      param = param.append('Search', productParam.Search);
    }
    param = param.append('PageNumber', productParam.pageNumber);
    param = param.append('PageSize', productParam.pageSize);

    return this.http.get<IPagination>(this.baseURL + '/Products', {
      params: param,
    });
  }

  getCategory() {
    return this.http.get<ICategory[]>(this.baseURL + '/Categories');
  }

  getProductDetails(id: number) {
    return this.http.get<IProduct>(this.baseURL + '/Products/' + id);
  }

}
