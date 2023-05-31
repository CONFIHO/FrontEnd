import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { INotificationService } from '../interfaces/i-notification-service';
import { Toast } from '../utils/constants';
import { SweetAlertIcon } from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements INotificationService {
  
  public showSpinner: boolean = false;

  hideLoading(): void {
    this.showSpinner = false;
  }
  
  showLoading(): void {
    this.showSpinner = true;
  }

  toastMessage(title: string, icon: SweetAlertIcon): void {
    Toast.fire({
      icon,
      title,
    });
  }
}
