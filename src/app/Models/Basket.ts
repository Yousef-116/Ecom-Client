import { v4 as uuidv4 } from 'uuid';
export interface IBasket {
  id: string;
  basketItems: IBasketItem[];
}

export interface IBasketItem {
  id: number;
  name: string;
  description: string;
  imageName: string;
  price: number;
  quantity: number;
  categoryName: string;
}

export class Basket implements IBasket {
  id: string;
  basketItems: IBasketItem[] = [];

  constructor() {
    this.id = uuidv4();
  }
}
