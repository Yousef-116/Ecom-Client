import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { RouterLink } from '@angular/router';
import { IBasket, IBasketItem } from '../../shared/models';
import { CommonModule, CurrencyPipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { OrderTotalComponent } from '../../shared/order-total/order-total.component';
import { IdentityService } from '../../identity/identity.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { IBasket, IBasketItem } from '../../shared/models/Basket';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule, OrderTotalComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  constructor(
    private basketService: BasketService,
    private identityService: IdentityService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  basket$!: Observable<IBasket | null>;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeItem(item: IBasketItem) {
    this.basketService.removeItemFormBasket(item);
  }
  decrementQuantity(item: IBasketItem) {
    this.basketService.DecrementBasketItemQuantity(item);
  }
  incrementQuantity(item: IBasketItem) {
    this.basketService.incrementBasketItemQuantity(item);
  }

  redirectToCheckout() {
    this.identityService.userName$.subscribe({
      next: (user) => {
        if (user) {
          this.router.navigateByUrl('/checkout');
        } else {
          this.toastr.warning('Please login first to proceed to checkout', 'Login Required');
          this.router.navigateByUrl('/account/login');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getImageUrl(imageName: string): string {
    if (!imageName) return '';
    if (imageName.toLowerCase().startsWith('/images/')) {
      return 'http://localhost:5037' + imageName;
    }
    return imageName;
  }
}



