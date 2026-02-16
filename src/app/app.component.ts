import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ShopComponent } from './shop/shop.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavBarComponent, ShopComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
