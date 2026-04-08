import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})

export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;
  RegisterData!: FormGroup;

  userName!: FormControl;
  DisplayName!: FormControl;
  email!: FormControl;
  Password!: FormControl;
  confirmPassword!: FormControl; // Added

  constructor(
    private identityService: IdentityService,
    private toast: ToastrService,
    private route: Router,
  ) {
    this.initFormControls();
    this.initFormGroups();
  }

  initFormControls() {
    this.userName = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.DisplayName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.Password = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.confirmPassword = new FormControl('', [Validators.required]); // Added
  }

  initFormGroups() {
    this.RegisterData = new FormGroup({
      userName: this.userName,
      Email: this.email,
      password: this.Password,
      confirmPassword: this.confirmPassword, // Added
      displayName: this.DisplayName,
    }, { validators: this.passwordMatch }); // Added custom validator
  }

  // Password matching logic
  passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');

    if (password && confirm && password.value !== confirm.value) {
      confirm.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.RegisterData.valid) {
      // Create a clean object to send to API (usually excluding confirmPassword)
      const { confirmPassword, ...registerPayload } = this.RegisterData.value;

      this.identityService.register(registerPayload).subscribe({
        next: (response) => {
          this.toast.success('Registration successful');
          this.route.navigateByUrl('/account/login');
        },
        error: (error) => {
          this.toast.error(error.error?.message || 'Something went wrong');
        }
      });
    }
  }
}