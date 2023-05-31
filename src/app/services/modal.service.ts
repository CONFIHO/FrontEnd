import { Injectable } from '@angular/core';
import { IModalService } from '../interfaces/i-modal-service';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService implements IModalService {
  constructor(private matDialog: MatDialog) {}

  open(component: ComponentType<any>, onClose?: () => void): () => void {
    const ref = this.matDialog.open(component);
    firstValueFrom(ref.afterClosed()).then(onClose);
    return () => ref.close();
  }
}
