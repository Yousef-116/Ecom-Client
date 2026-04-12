import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'; // 1. Import OnChanges and SimpleChanges
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { IProduct } from '../../Models/Product';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [CommonModule, RouterModule, ToastrModule],
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent implements OnChanges {
  // 2. Implement OnChanges
  @Input({ required: true }) product!: IProduct;
  selectedImage: string = '';

  constructor(
    private service: BasketService,
    private toastr: ToastrService,
  ) {}

  // 3. Add this method to handle Input updates
  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product?.photos?.length > 0) {
      // Whenever the product object changes (on pagination), update the image
      this.selectedImage = this.product.photos[0].imageName;
    }
  }

  // You can keep ngOnInit or remove it, as ngOnChanges handles the initial load too
  ngOnInit() {
    if (!this.selectedImage && this.product?.photos?.length > 0) {
      this.selectedImage = this.product.photos[0].imageName;
    }
  }

  getImageUrl(imageName: string): string {
    if (!imageName) return '';
    if (imageName.toLowerCase().startsWith('/images/')) {
      return 'http://localhost:5037' + imageName;
    }
    return imageName;
  }

  changeImage(imageName: string) {
    this.selectedImage = imageName;
  }

  SetBasketValue() {
    this.service.addItemToBasket(this.product);
    this.toastr.success('Item added to basket');
  }
}
