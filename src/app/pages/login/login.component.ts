import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { userStore } from '../users.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [Validators.required]);

  formAuth: FormGroup = this.formBuilder.group({
    email: this.email,
    password: this.password,
  });

  constructor(
    private formBuilder: FormBuilder,
    private userStore: userStore
  ) {}

  async login() {
    await this.userStore.login(
      this.formAuth.value.email,
      this.formAuth.value.password
    );
  }

  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.email.hasError('email') ? 'email inválido' : '';
  }
}
