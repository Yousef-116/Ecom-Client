import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from '../../Models/Basket';
import { ICreateOrder } from '../../Models/Orders';
import { FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MatButton, MatStepperModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  @Input() delivery: FormGroup;
  @Input() Address: FormGroup;

  constructor(
    private toaster: ToastrService,
    private checkoutService: CheckoutService,
    private basketService: BasketService,
    private router: Router,
  ) {}

  CreateOrder() {
    const basket = this.basketService.GetCurrentValue();
    const order = this.getOrderCreate(basket);
    this.checkoutService.CreateOrder(order).subscribe({
      next: (value) => {
        console.log('Payment Done !!!!!!', value);
        this.toaster.success('Order Created ', 'SUCCESSFULLY');
        this.router.navigate(['/checkout/success'], {
          queryParams: { orderId: value.id },
        });

        this.basketService.deleteBasket();
      },
      error(err) {
        console.log('Fail Create Order' + err);
        this.toaster.console.error('Fail Create Order');
      },
    });
  }
  getOrderCreate(basket: IBasket): ICreateOrder {
    return {
      basketId: basket.id,
      shippingAddress: this.Address.value,
      deliveryMethodID: this.delivery.value.delivery,
    };
  }

  ngOnInit(): void {}
}
