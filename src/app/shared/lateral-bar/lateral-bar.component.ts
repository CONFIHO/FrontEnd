import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthService } from 'src/app/interfaces/i-auth-service';
import { INotificationService } from 'src/app/interfaces/i-notification-service';
import { userStore } from 'src/app/pages/users.store';
import { Toast } from 'src/app/utils/constants';

@Component({
  selector: 'app-lateral-bar',
  templateUrl: './lateral-bar.component.html',
  styleUrls: ['./lateral-bar.component.css'],
})
export class LateralBarComponent {

  selected: number = 0;

  constructor(
    private userStore: userStore
  ) {}

  async logOut() {
    await this.userStore.logOut();
  }

  goTo(index: number){
    this.selected = index;
    this.userStore.selectPage(index);
  }
}
