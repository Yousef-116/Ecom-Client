import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { BasketService } from '../../basket/basket.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { map } from 'rxjs/operators';
import { IBasket } from '../../Models/Basket';
import { InteropObservable, Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    AsyncPipe,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  ngOnInit(): void {
    var basketId = localStorage.getItem('basketId');
    if (basketId) {
      //console.log('Basket ID found in localStorage: ', basketId);
      this.basketService.GetBasket(basketId).subscribe({
        next: (value) => {
          console.log('Basket loaded successfully: ', value);
          this.basket$ = this.basketService.basket$;
        },
      });
    } else {
      //console.log('No Basket ID found in localStorage');
    }
  }
  // get basketCount(): number {
  //   return (
  //     this.basket?.basketItems?.reduce((acc, item) => acc + item.quantity, 0) ??
  //     0
  //   );
  // }

  constructor(public basketService: BasketService) {}
  visible: boolean = false;

  ToggleDropDown() {
    this.visible = !this.visible;
  }
}
