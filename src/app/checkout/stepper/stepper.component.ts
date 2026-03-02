import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { AddressComponent } from '../address/address.component';
import { DeliveryComponent } from '../delivery/delivery.component';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AddressComponent,
    DeliveryComponent,
    PaymentComponent,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  private _formBuilder = inject(FormBuilder);

  Address = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    state: ['', Validators.required],
  });

  DeliveryMethod = this._formBuilder.group({
    delivery: ['', Validators.required],
  });
  PaymentForm = this._formBuilder.group({
    nameOnCard: ['', Validators.required],
  });

  isLinear = true;
  // constructor(
  //   private _formBuilder: FormBuilder,
  //   private checkoutService: CheckoutService,
  // ) {}
  // ngOnInit(): void {
  //   this.checkoutService.getAddress().subscribe({
  //     next: (res) => {
  //       console.log('Get Address Done');
  //       this.Address.patchValue(res);
  //     },
  //     error: (error) => {
  //       console.error('Get Address failed', error);
  //     },
  //   });
  // }

  // Address = this._formBuilder.group({
  //   firstName: ['', Validators.required],
  //   lastName: ['', Validators.required],
  //   street: ['', Validators.required],
  //   city: ['', Validators.required],
  //   zipCode: ['', Validators.required],
  //   state: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  // UpdateAddress() {
  //   if (this.Address.invalid) {
  //     console.log('Address Not Valid');
  //     return;
  //   }

  //   this.checkoutService.updateAddress(this.Address.value).subscribe({
  //     next: () => {
  //       console.log('Address updated successfully');
  //     },
  //     error: (error) => {
  //       console.error('Update failed', error);
  //     },
  //   });
  // }
}
