import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CheckoutService } from '../checkout.service';
import { IDelivery } from '../../Models/Delivery';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon,
    CurrencyPipe,
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent implements OnInit {
  deliveryMethods: IDelivery[];
  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService,
  ) {}

  SetDeliveryMethods() {
    var deliveryMethod = this.deliveryMethods.find(
      (d) => d.id == this.delivery.value.delivery,
    );
    console.log(deliveryMethod);
    this.basketService.SetDeliveryMethod(deliveryMethod);
  }
  ngOnInit(): void {
    this.checkoutService.getDeliveryMethod().subscribe({
      next: (value) => {
        console.log('Get Delivery Done' + value);
        //this.toaster.success('Address updated successfully', 'SUCCESS');
        this.deliveryMethods = value;
      },
      error: (error) => {
        console.error('Get Deliver failed', error);
      },
    });
  }

  // UpdateDelivery() {
  //   throw new Error('Method not implemented.');
  // }
  @Input() delivery: FormGroup;
}
