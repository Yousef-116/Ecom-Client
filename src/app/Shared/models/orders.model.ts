export interface ICreateOrder {
  deliveryMethodID: number;
  basketId: string;
  shippingAddress: IShippingAddress;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IOrder {
  id: number;
  buyerEmail: string;
  subTotal: number;
  total: number;
  orderDate: string;
  shippingAddress: IShippingAddress;
  deliveryMethod: string;
  orderItems: IOrderItem[];
  status: string;
}

export interface IOrderItem {
  productItemId: number;
  price: number;
  quantity: number;
  productName: string;
  mainImage: string;
}
