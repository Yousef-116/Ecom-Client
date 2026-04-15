import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { AddProductRatingDTO, ProductRatingDTO } from '../Shared/models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  baseURL = Environment.baseURL;

  constructor(private http: HttpClient) { }

  getRatingsByProductId(productId: number) {
    return this.http.get<ProductRatingDTO[]>(this.baseURL + `/ProductRatings/product/${productId}`);
  }

  addRating(rating: AddProductRatingDTO) {
    return this.http.post(this.baseURL + '/ProductRatings', rating, {
      responseType: 'text'
    });
  }
}


