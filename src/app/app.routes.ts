import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'shop',
    loadComponent: () =>
      import('./shop/shop.component').then((c) => c.ShopComponent),
  },
  {
    path: 'product-details/:id',
    loadComponent() {
      return import('./shop/product-details/product-details.component').then(
        (c) => c.ProductDetailsComponent,
      );
    },
  },
  {
    path: 'checkout',
    loadComponent() {
      return import('./checkout/checkout.component').then(
        (c) => c.CheckoutComponent,
      );
    },
  },
  {
    path: 'basket',
    loadComponent() {
      return import('./basket/basket/basket.component').then(
        (c) => c.BasketComponent,
      );
    },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
