import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../Models/Basket';
import { IProduct } from '../Models/Product';
import { Environment } from '../environment';
import { IDelivery } from '../Models/Delivery';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) { }

  //BaseURL = 'http://localhost:5037/api/';
  //BaseURL = 'https://localhost:7097/api/';
  BaseURL = Environment.baseURL;

  //private basketSource = new BehaviorSubject<IBasket>(null);
  private basketSource = new BehaviorSubject<IBasket>({
    id: '',
    basketItems: []
  });
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotal>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  deleteBasket() {
    this.basketSource.next({
      id: '',
      basketItems: []
    });
    this.basketTotalSource.next(null);
    localStorage.removeItem('basketId');
  }
  CreatePaymentIntent(deliveryMethodId: number) {
    return this.http
      .post(
        this.BaseURL +
        `/Payments/Create?basketId=${this.GetCurrentValue().id}&deliveryId=${deliveryMethodId}`,
        {},
      )
      .pipe(
        map((value: IBasket) => {
          this.basketSource.next(value);
          console.log('From BasketService' + value);
          console.log(value);
        }),
      );
  }

  GetBasket(id: string) {
    return this.http.get(this.BaseURL + '/Baskets/get-basket?id=' + id).pipe(
      map((value: IBasket) => {
        if (value) {
          this.basketSource.next(value);
          this.calculateTotal();
          return value;
        } else {
          const emptyBasket: IBasket = { id: '', basketItems: [] };
          this.basketSource.next(emptyBasket);
          return emptyBasket;
        }
      }),
    );
  }
  SetBasket(basket: IBasket) {
    return this.http
      .post(this.BaseURL + '/Baskets/update-basket', basket)
      .subscribe({
        next: (value: IBasket) => {
          this.basketSource.next(value);
          this.calculateTotal();
          // console.log(value);
        },
        error(err) {
          // console.log(err);
        },
      });
  }

  DeleteBasketItem(basket: IBasket) {
    return this.http
      .delete(this.BaseURL + '/Baskets/delete-basket/' + basket.id)
      .subscribe({
        next: (value) => {
          this.basketSource.next({
            id: '',
            basketItems: []
          });
          localStorage.removeItem('basketId');
        },
        error(err) {
          console.log(err);
        },
      });
  }
  ShippingCost: number;
  SetDeliveryMethod(delivery: IDelivery) {
    this.ShippingCost = delivery.price;
    this.calculateTotal();
  }

  calculateTotal() {
    const basket = this.GetCurrentValue();
    const shipping = this.ShippingCost || 0;
    const subtotal = basket.basketItems.reduce((acc, item) => {
      return item.price * item.quantity + acc;
    }, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({ shipping, subtotal, total });
  }
  incrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.GetCurrentValue();
    const itemIndex = basket.basketItems.findIndex((i) => i.id === item.id);
    basket.basketItems[itemIndex].quantity++;
    this.SetBasket(basket);
  }

  DecrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.GetCurrentValue();
    const itemIndex = basket.basketItems.findIndex((i) => i.id === item.id);
    if (basket.basketItems[itemIndex].quantity > 1) {
      basket.basketItems[itemIndex].quantity--;
      this.SetBasket(basket);
    } else {
      this.removeItemFormBasket(item);
    }
  }

  removeItemFormBasket(item: IBasketItem) {
    const basket = this.GetCurrentValue();

    basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);

    if (basket.basketItems.length > 0) {
      this.SetBasket(basket);
    } else {
      // Call API to delete basket
      this.DeleteBasketItem(basket);

      // Emit EMPTY basket instead of null
      const emptyBasket: IBasket = {
        id: '',
        basketItems: []
      };

      this.basketSource.next(emptyBasket);
      this.basketTotalSource.next(null);

      localStorage.removeItem('basketId');
    }
  }

  GetCurrentValue() {
    return this.basketSource.value;
  }
  addItemToBasket(product: IProduct, quantity: number = 1) {
    const itemToAdd = this.MapProductToBasketItem(product, quantity);

    let basket = this.GetCurrentValue();

    if (!basket || basket.id === '') {
      basket = this.CreateBasket();
    }

    if (!basket.basketItems) {
      basket.basketItems = [];
    }

    basket.basketItems = this.AddOrUpdate(basket.basketItems, itemToAdd);

    this.SetBasket(basket);
  }

  AddOrUpdate(
    basketItems: IBasketItem[],
    itemToAdd: IBasketItem,
  ): IBasketItem[] {
    const index = basketItems.findIndex((i) => i.id === itemToAdd.id);
    if (index >= 0) {
      basketItems[index].quantity += itemToAdd.quantity;
    } else {
      basketItems.push(itemToAdd);
    }
    return basketItems;
  }

  CreateBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }

  private MapProductToBasketItem(
    product: IProduct,
    quantity: number,
  ): IBasketItem {
    console.log('Mapping product to basket item: ', product.name);
    return {
      id: product.id,
      name: product.name,
      price: product.newPrice,
      quantity: quantity,
      imageName: product.photos[0].imageName,
      categoryName: product.categoryName,
      description: product.description,
    };
  }
}
