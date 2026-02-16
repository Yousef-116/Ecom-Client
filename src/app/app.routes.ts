import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';

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
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
