import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private identityService: IdentityService,
    private toast: ToastrService,
  ) {
    this.initFormControls();
    this.initFormGroups();
  }
  RegisterData!: FormGroup;

  userName!: FormControl;
  DisplayName!: FormControl;
  email!: FormControl;
  Password!: FormControl;
  //userRePass!: FormControl;
  //userPhone!: FormControl;
  //userCity!: FormControl;
  //userStreet!: FormControl;

  initFormControls() {
    this.userName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.DisplayName = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.Password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);
  }

  initFormGroups() {
    this.RegisterData = new FormGroup({
      userName: this.userName, // Changed from 'name' to 'userName'
      Email: this.email, // Changed from 'email' to 'userEmail'
      password: this.Password, // Changed from 'password' to 'userPass'
      displayName: this.DisplayName,
    });
  }

  onSubmit() {
    if (this.RegisterData.valid) {
      console.log(this.RegisterData.value);
      // You can perform further actions here, such as sending the data to a server
      this.identityService.register(this.RegisterData.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.toast.success(response);
        },
        error: (error) => {
          console.log('Full error:', error);
          console.log('Error body:', error.error);

          if (typeof error.error === 'string') {
            this.toast.error(error.error);
          } else if (error.error?.message) {
            this.toast.error(error.error.message);
          } else {
            this.toast.error('Something went wrong');
          }
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
