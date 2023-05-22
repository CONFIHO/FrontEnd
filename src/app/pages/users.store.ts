import { Store, StoreConfig } from '@datorama/akita';
import { INotificationService } from 'src/app/interfaces/i-notification-service';
import { IUserService } from 'src/app/interfaces/i-user-service';
import { User } from 'src/app/models/User';
import { IAuthService } from '../interfaces/i-auth-service';
import { Router } from '@angular/router';
import { controllerExceptions } from '../exceptions/exceptionsController';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface userProps {
  page: number;
  per_page: number;
  total_page: number;
  user: User | null;
  userList: User[];
}

export function createInitialState(): userProps {
  return {
    user: null,
    userList: [],
    page: 1,
    per_page: 10,
    total_page: 0,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class userStore extends Store<userProps> {
  
  constructor(
    private userService: IUserService,
    private notificationService: INotificationService,
    private authService: IAuthService,
    private router: Router
  ) {
    super(createInitialState());
  }

  public get userList$(): Observable<User[]> {
    return this._select((store) => store.userList);
  }

  async login(email: string, password: string) {
    try {
      await this.authService.login(email, password);
      this.router.navigate(['/menu/users']);
      this.notificationService.toastMessage(
        'Sesión iniciada con éxito',
        'success'
      );
    } catch (error) {
      this.notificationService.toastMessage(
        controllerExceptions(error),
        'error'
      );
    }
  }

  async logOut() {
    try {
      await this.authService.logout();
      this.router.navigate(['login']);
      this.notificationService.toastMessage(
        'Sesión cerrada con éxito',
        'success'
      );
    } catch (error) {
      this.notificationService.toastMessage(
        'Tenemos problemas para cerrar tu sesión',
        'error'
      );
    }
  }

  async fetchUsers(refresh: boolean, searchFilter?: string) {
    try {
      this.notificationService.showLoading();
      const oldState = this._value();
      if (refresh || oldState.userList.length < oldState.total_page) {
        oldState.page = refresh ? 1 : oldState.page + 1;
        const response = await this.userService.fetchUsers(
          oldState.page,
          oldState.per_page,
          searchFilter
        );
        oldState.userList = response.items;
        oldState.total_page = response.total;
        this.update({
          ...oldState,
        });
      }
    } catch (error) {
      this.notificationService.toastMessage(
        controllerExceptions(error),
        'error'
      );
    }
    this.notificationService.hideLoading();
  }

  selectPage(index: number) {
    this.router.navigate([ index == 1 ? 'menu/reports' : 'menu/users']);
  }
}
