import { SweetAlertIcon } from 'sweetalert2';

export abstract class INotificationService {
  abstract hideLoading(): void;
  abstract showLoading(): void;
  abstract toastMessage(title: string, icon: SweetAlertIcon): void;
}
