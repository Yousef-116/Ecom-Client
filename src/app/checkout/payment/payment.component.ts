import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from '../../Models/Basket';
import { ICreateOrder } from '../../Models/Orders';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MatButton, MatStepperModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  @Input() delivery: FormGroup;
  @Input() Address: FormGroup;
  @Input() paymentForm: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;
  //stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  orderId: number;
  cardHandler = this.onChange.bind(this);
  loader: boolean = false;
  constructor(
    private checkoutService: CheckoutService,
    private toast: ToastrService,
    private basketService: BasketService,
    private router: Router,
  ) {}
  onChange({ error }) {
    if (error) {
      this.cardErrors = error.message;
    } else {
      this.cardErrors = null;
    }
  }

  stripe: Stripe | null = null;

  async ngAfterViewInit(): Promise<void> {
    this.stripe = await loadStripe(
      'pk_test_51T71GbB09F3xhT2MQdVRVlxVzZQDpObxOXnUzoTShs3v0ko7oIDAZDsNQyf3tB6Zp8dIASC2f12PGuAMC8K3V4x200jAKxb68i',
    );

    const elements = this.stripe!.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy(): void {
    this.cardCvc.destroy();
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
  }
  ngOnInit(): void {}

  async submitOrder() {
    this.loader = true;

    try {
      const basket = this.basketService.GetCurrentValue();
      const order = this.getOrderCreate(basket);

      // 1️⃣ create order
      const createdOrder = await firstValueFrom(
        this.checkoutService.CreateOrder(order),
      );

      this.orderId = createdOrder.id;

      // 2️⃣ confirm payment
      const paymentResult = await this.stripe.confirmCardPayment(
        basket.clientSecret,
        {
          payment_method: {
            card: this.cardNumber,
            billing_details: {
              name: this.paymentForm.get('nameOnCard')?.value,
            },
          },
        },
      );

      // 3️⃣ payment success
      if (paymentResult.paymentIntent) {
        await firstValueFrom(
          this.checkoutService.updateOrderStatus(this.orderId, 1),
        );

        this.toast.success('Payment Successful');

        this.router.navigate(['/checkout/success'], {
          queryParams: { orderId: this.orderId },
        });

        this.basketService.deleteBasket();
      }

      // 4️⃣ payment failed
      if (paymentResult.error) {
        await firstValueFrom(
          this.checkoutService.updateOrderStatus(this.orderId, 2),
        );

        this.toast.error(paymentResult.error.message);
      }
    } catch (error) {
      console.log(error);
      this.toast.error('Something went wrong');
    }

    this.loader = false;
  }

  // async SubmetOrder() {
  //   this.loader = true;

  //   const basket = this.basketService.GetCurrentValue();
  //   const order = this.getOrderCreate(basket);

  //   await this.CreateOrder(order);

  //   const PaymentDetials = await this.confirmPaymentWithStripe(basket);

  //   if (PaymentDetials.paymentIntent) {
  //     this.loader = false;

  //     this.toast.success('Order Created Successfuly', 'SUCCESS');

  //     this.router.navigate(['/checkout/success'], {
  //       queryParams: { orderId: this.orderId },
  //     });

  //     this.basketService.deleteBasket();
  //   } else {
  //     this.loader = false;
  //     this.toast.error(PaymentDetials.error.message, 'ERROR');
  //   }
  // }

  async confirmPaymentWithStripe(basket: IBasket) {
    return this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.paymentForm.get('nameOnCard').value,
        },
      },
    });
  }
  async CreateOrder(order: ICreateOrder) {
    this.checkoutService.CreateOrder(order).subscribe({
      next: (value) => {
        this.orderId = value.id;
      },
      error: (err) => {
        console.log(err);
        this.toast.error('something went wrong');
      },
    });
  }
  getOrderCreate(basket: IBasket): ICreateOrder {
    return {
      basketId: basket.id.toString(),
      deliveryMethodID: this.delivery.value.delivery,
      shippingAddress: this.Address.value,
    };
  }
}
