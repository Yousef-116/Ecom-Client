export interface ProductRatingDTO {
  id: number;
  username?: string;
  message?: string;
  score: number;
  productId: number;
}

export interface AddProductRatingDTO {
  username?: string;
  message?: string;
  score: number;
  productId: number;
}
