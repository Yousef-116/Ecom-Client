import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-address',
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
    MatIcon,
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  @Input() address: FormGroup;

  constructor(
    //private _formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private toaster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.checkoutService.getAddress().subscribe({
      next: (res) => {
        console.log('Get Address Done');
        this.address.patchValue(res);
      },
      error: (error) => {
        console.error('Get Address failed', error);
      },
    });
  }

  UpdateAddress() {
    if (this.address.invalid) {
      console.log('Address Not Valid');
      return;
    }

    this.checkoutService.updateAddress(this.address.value).subscribe({
      next: () => {
        console.log('Address updated successfully');
        this.toaster.success('Address updated successfully', 'SUCCESS');
      },
      error: (error) => {
        console.error('Update failed', error);
      },
    });
  }
}
