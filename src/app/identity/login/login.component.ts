import { Component } from '@angular/core';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showForgotModal = false;
  emailValue: string = '';
  constructor(
    private identityService: IdentityService,
    private toast: ToastrService,
    private route: Router,
  ) {
    this.initFormControls();
    this.initFormGroups();
  }
  LoginData!: FormGroup;

  email!: FormControl;
  Password!: FormControl;

  initFormControls() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.Password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);
  }

  initFormGroups() {
    this.LoginData = new FormGroup({
      email: this.email,
      password: this.Password,
    });
  }

  onSubmit() {
    if (this.LoginData.valid) {
      console.log(this.LoginData.value);
      // You can perform further actions here, such as sending the data to a server
      this.identityService.login(this.LoginData.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.toast.success(response);
          this.route.navigateByUrl('/');
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

  onForgotPassword() {
    console.log('Forgot password email:', this.emailValue);

    this.identityService.forgotPassword(this.emailValue).subscribe({
      next: (response) => {
        console.log('Forgot password request successful:', response);
        this.toast.success(response.toString());
        this.showForgotModal = false;
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
  }
}
