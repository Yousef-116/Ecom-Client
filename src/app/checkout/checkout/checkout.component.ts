import { Component } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { OrderTotalComponent } from '../../Shared/order-total/order-total.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [StepperComponent, OrderTotalComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {}
