import { Component } from '@angular/core';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private identityService: IdentityService,
    private toast: ToastrService,
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
