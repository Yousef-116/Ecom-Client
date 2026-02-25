import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountShellComponent } from './identity/account-shell.component';

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
    path: 'account',
    component: AccountShellComponent,
    children: [
      {
        //account/register
        path: 'register',
        loadComponent: () =>
          import('./identity/register/register.component').then(
            (c) => c.RegisterComponent,
          ),
      },
      {
        //account/active
        path: 'active',
        loadComponent: () =>
          import('./identity/active/active.component').then(
            (c) => c.ActiveComponent,
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./identity/login/login.component').then(
            (c) => c.LoginComponent,
          ),
      },
      {
        path: 'Reset-Password',
        loadComponent: () =>
          import('./identity/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent,
          ),
      },

      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'checkout',
    loadComponent() {
      return import('./checkout/checkout/checkout.component').then(
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
