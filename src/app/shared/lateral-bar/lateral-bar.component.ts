import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthService } from 'src/app/interfaces/i-auth-service';
import { INotificationService } from 'src/app/interfaces/i-notification-service';
import { userStore } from 'src/app/pages/users.store';
import { AuthService } from 'src/app/services/auth.service';
import { Toast } from 'src/app/utils/constants';

@Component({
  selector: 'app-lateral-bar',
  templateUrl: './lateral-bar.component.html',
  styleUrls: ['./lateral-bar.component.css'],
})
export class LateralBarComponent implements OnInit {

  selected: number = 0;
  name : string = '';

  constructor(
    private userStore: userStore,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.name = this.auth.userEmail;
  }

  async logOut() {
    await this.userStore.logOut();
  }

  goTo(index: number){
    this.selected = index;
    this.userStore.selectPage(index);
  }
}
