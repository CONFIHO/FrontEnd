import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { controllerExceptions } from 'src/app/exceptions/exceptionsController';
import { IAuthService } from 'src/app/interfaces/i-auth-service';
import { Toast } from 'src/app/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);

  formAuth: FormGroup = this.formBuilder.group({
    email: this.email,
    password: this.password,
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: IAuthService
  ) {}

  ngOnInit(): void {}

  async login() {
    try {
      const response = await this.authService.login(
        this.formAuth.value.email,
        this.formAuth.value.password
      );
      Toast.fire({
        icon: 'success',
        title:
          'Sesión iniciada con éxito',
      });
    } catch (error) {
      controllerExceptions(error);
    }
  }

  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.email.hasError('email') ? 'email inválido' : '';
  }
}
