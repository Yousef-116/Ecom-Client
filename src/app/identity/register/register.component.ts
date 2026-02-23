import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor() {
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
}
