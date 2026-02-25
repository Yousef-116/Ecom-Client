import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/Product';
import { ICategory } from '../Models/Category';
import { ProductParams } from '../Models/ProductParams';
import { IPagination } from '../Models/Pagination';
import { Environment } from '../environment';

// import { ProductParam } from '../shared/Models/ProductParam';
// import { IProduct } from '../shared/Models/Product';
// import { environment } from '../../environments/environment.development';
// import { IReview } from '../shared/Models/review';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  //baseURL = 'https://localhost:7097/api';
  //baseURL = 'http://localhost:5037/api';
  baseURL = Environment.baseURL;

  //Product: IProduct[];

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

    return this.http.get<IPagination>(this.baseURL + '/Product/get-all', {
      params: param,
    });
  }

  getCategory() {
    return this.http.get<ICategory[]>(this.baseURL + '/Categories/get-all');
  }

  getProductDetails(id: number) {
    return this.http.get<IProduct>(this.baseURL + '/Product/get-by-id/' + id);
  }
  // baseURL = environment.baseURL;

  // getProduct(productParam:ProductParam) {
  //   let param=new HttpParams();
  //   if(productParam.CategoryId){
  //     param=param.append("categoryId",productParam.CategoryId)
  //   }
  //   if(productParam.SortSelected){
  //     param=param.append("Sort",productParam.SortSelected)
  //   }
  //   if(productParam.search){
  //     param=param.append("Search",productParam.search)
  //   }
  //   param=param.append("pageNumber",productParam.pageNumber)
  //   param=param.append("pageSize",productParam.pageSize)
  //   return this.http.get<IPagnation>(this.baseURL+"Products/get-all",{params:param});
  // }
  // getCategory(){
  //
  // }
  // getProductDetails(id:number){
  //   return this.http.get<IProduct>(this.baseURL+"Products/get-by-id/"+id)
  // }
  // getProductRating(id:number){
  //   return this.http.get<IReview[]>(this.baseURL+"Ratings/get-rating/"+id)
  // }
}
