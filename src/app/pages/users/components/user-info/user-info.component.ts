import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IModalService } from 'src/app/interfaces/i-modal-service';
import { INotificationService } from 'src/app/interfaces/i-notification-service';
import { User } from 'src/app/models/User';
import { userStore } from 'src/app/pages/users.store';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  names: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);
  rol: FormControl = new FormControl('', [Validators.required]);
  enabled: FormControl = new FormControl(true);
  form: FormGroup = this.fb.group({
    names: this.names,
    email: this.email,
    password: this.password,
    rol: this.rol,
    enabled: this.enabled,
  });
  formUpdate: FormGroup = this.fb.group({
    names: this.names,
    email: this.email,
    rol: this.rol,
    enabled: this.enabled,
  });
  actualUser: User | null = null;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserInfoComponent>,
    private userStore: userStore
  ) {}

  ngOnInit(): void {
    (async () => {
      if (this.userStore.actualUser != null) {
        await this.chargeInfo();
      }else{
        this.formUpdate.reset()
        this.form.reset()
      }
    })();
  }

  getErrorEmailMessage() {
    return this.email.hasError('required')
      ? 'Campo requerido'
      : this.email.hasError('email')
      ? 'Debes ingresar un correo válido'
      : '';
  }

  async chargeInfo() {
    this.actualUser = this.userStore.actualUser;
    this.form.get('names')?.setValue(this.actualUser?.name);
    this.form.get('email')?.setValue(this.actualUser?.email);
    this.form.get('password')?.setValue(this.actualUser?.password);
    this.form.get('rol')?.setValue(this.actualUser?.rol);
    this.form.get('enabled')?.setValue(this.actualUser?.enabled);
  }

  async deleteUser() {
    this.dialogRef.close();
    await this.userStore.deleteUser();
  }

  async createUser() {
    this.dialogRef.close();
    await this.userStore.createUser(
      this.form.value as {
        names: string;
        email: string;
        password: string;
        rol: string;
        enabled: boolean;
      }
    );
  }
  
  async updateUser() {
    this.dialogRef.close();
    await this.userStore.updateUser(this.formUpdate.value);
  }
}
