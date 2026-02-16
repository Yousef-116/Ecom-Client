export interface IProduct {
  id: number;
  name: string;
  description: string;
  oldPrice: number;
  newPrice: number;
  photos: IPhoto[];
  categoryName: string;
}

export interface IPhoto {
  imageName: string;
  productId: number;
}
