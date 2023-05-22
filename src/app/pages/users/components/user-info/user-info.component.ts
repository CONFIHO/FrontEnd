import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IModalService } from 'src/app/interfaces/i-modal-service';
import { INotificationService } from 'src/app/interfaces/i-notification-service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {

  names: FormControl = new FormControl('', [Validators.required]);
  lastnames: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.email]);
  rol: FormControl = new FormControl('', [Validators.required]);
  enabled: FormControl = new FormControl(true);
  form: FormGroup = this.fb.group({
    names: this.names,
    lastnames: this.lastnames,
    email: this.email,
    rol: this.rol,
    enabled: this.enabled
  });

  constructor(
    private fb: FormBuilder,
    private modalService: IModalService,
    private notificationService: INotificationService
  ) {}

  ngOnInit(): void {}

  getErrorEmailMessage() {
    return this.email.hasError('required')
      ? 'Campo requerido'
      : this.email.hasError('email')
      ? 'Debes ingresar un correo válido'
      : '';
  }
}
