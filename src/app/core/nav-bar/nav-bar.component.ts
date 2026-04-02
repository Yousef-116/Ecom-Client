import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, AsyncPipe, NgIf } from '@angular/common';
import { BasketService } from '../../basket/basket.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Observable } from 'rxjs';
import { IBasket } from '../../Models/Basket';
import { isPlatformBrowser } from '@angular/common';
import { IdentityService } from '../../identity/identity.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgIf, // ✅ needed for *ngIf
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    AsyncPipe, // ✅ needed for | async
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  userName$: Observable<string | null>;
  visible: boolean = false;

  constructor(
    public basketService: BasketService,
    //private userService: UserService,
    private userService: IdentityService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.basket$ = this.basketService.basket$;
    this.userName$ = this.userService.userName$;
  }

  ngOnInit(): void {
    // Load basket if exists
    if (isPlatformBrowser(this.platformId)) {
      const basketId = localStorage.getItem('basketId');
      if (basketId) {
        this.basketService.GetBasket(basketId).subscribe();
      }
    }

    // Load user
    this.userService.isAuthenticated().subscribe({
      next: (isAuth) => {
        if (isAuth) this.userService.loadUserName();
        console.log('User authenticated:', isAuth);
        this.userName$.subscribe((name) => {
          console.log('User name changed to:', name);
        });
      },
      error: () => this.userService.clearUser(), // ✅ safe,
    });
  }

  ToggleDropDown() {
    this.visible = !this.visible;
  }

  logout() {
    this.userService.logout();
    this.visible = false;
  }
}
