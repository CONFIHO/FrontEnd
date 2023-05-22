import { Injectable } from '@angular/core';
import { IModalService } from '../interfaces/i-modal-service';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService implements IModalService {
  constructor(private matDialog: MatDialog) {}

  open(component: ComponentType<any>): void {
    this.matDialog.open(component);
  }
}
