import { Injectable } from '@angular/core';
import { INotificationService } from '../interfaces/i-notification-service';
import { Toast } from '../utils/constants';
import { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements INotificationService {
  
  hideLoading(): void {
    throw new Error('Method not implemented.');
  }
  showLoading(): void {
    throw new Error('Method not implemented.');
  }

  toastMessage(title: string, icon: SweetAlertIcon): void {
    Toast.fire({
      icon,
      title,
    });
  }
}
