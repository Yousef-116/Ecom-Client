import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';
import { IResetPassword } from '../../Models/Account';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  //email: string;
  //token: string;
  resetPassword: IResetPassword;
  constructor(
    private router: ActivatedRoute,
    private identityService: IdentityService,
    private toaster: ToastrService,
    private route: Router,
  ) {
    router.queryParams.subscribe((params) => {
      //  this.email = params['email'];
      //this.token = params['code'];
    });
    this.initFormControls();
    this.initFormGroups();
  }
  ResetPasswordData!: FormGroup;

  confirmPassword!: FormControl;
  password!: FormControl;

  initFormControls() {
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);
  }
  initFormGroups() {
    this.ResetPasswordData = new FormGroup(
      {
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      { validators: this.passwordMatch },
    );
  }
  passwordMatch(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // Only validate if both controls have values
    if (!password || !confirmPassword) {
      return null;
    }

    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    // Check if they match
    if (
      passwordValue &&
      confirmPasswordValue &&
      passwordValue !== confirmPasswordValue
    ) {
      // Set error on confirmPassword control
      confirmPassword.setErrors({ passwordMismatch: true });
      // Return error for the form group
      return { passwordMismatch: true };
    } else {
      // Clear the error if passwords match
      if (confirmPassword.hasError('passwordMismatch')) {
        const errors = { ...confirmPassword.errors };
        delete errors['passwordMismatch'];
        confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
      }
      return null;
    }
  }

  onSubmit() {
    //this.passwordMatch();
    if (this.ResetPasswordData.valid) {
      // Call your reset password API here with this.email, this.Password.value, and this.token

      this.resetPassword = {
        email: this.router.snapshot.queryParams['email'],
        password: this.password.value,
        token: this.router.snapshot.queryParams['code'],
      };
      console.log('Resetting password for:', this.resetPassword.email);
      console.log('New Password:', this.resetPassword.password);
      console.log('Token:', this.resetPassword.token);

      this.identityService.resetPassword(this.resetPassword).subscribe(
        (response) => {
          this.toaster.success('Password reset successfully');
          this.route.navigateByUrl('/account/login');
        },
        (error) => {
          this.toaster.error('Failed to reset password');
        },
      );
    }
  }
}
