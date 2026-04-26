import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models';
import { ICategory } from '../shared/models';
import { ProductParams } from '../shared/models';
import { IPagination } from '../shared/models';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) { }

  baseURL = Environment.baseURL;

  getProduct(productParam: ProductParams) {
    let params = new HttpParams();

    console.log('PARAMS:', productParam); // ✅ better debugging

    // ✅ Only send category if it's NOT default (0)
    if (productParam.SelectedCategoryId > 0) {
      params = params.set('CategoryId', productParam.SelectedCategoryId.toString());
    }

    if (productParam.SortSelected) {
      params = params.set('Sort', productParam.SortSelected);
    }

    if (productParam.Search && productParam.Search.trim().length > 0) {
      params = params.set('Search', productParam.Search.trim());
    }

    params = params.set('PageNumber', productParam.pageNumber.toString());
    params = params.set('PageSize', productParam.pageSize.toString());

    return this.http.get<IPagination>(`${this.baseURL}/Products`, {
      params,
    });
  }

  getCategory() {
    return this.http.get<ICategory[]>(this.baseURL + '/Categories');
  }

  getProductDetails(id: number) {
    return this.http.get<IProduct>(this.baseURL + '/Products/' + id);
  }

}


