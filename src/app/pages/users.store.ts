import { Store, StoreConfig } from '@datorama/akita';
import { INotificationService } from 'src/app/interfaces/i-notification-service';
import { IUserService } from 'src/app/interfaces/i-user-service';
import { User } from 'src/app/models/User';
import { IAuthService } from '../interfaces/i-auth-service';
import { Router } from '@angular/router';
import { controllerExceptions } from '../exceptions/exceptionsController';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Rol } from '../models/Rol';
import { NotificationService } from '../services/notification.service';
import * as moment from 'moment';

export interface userProps {
  user: User | null;
  userList: User[];
  reload: boolean;
  filters: {
    rol_id: number | undefined;
    is_active: boolean | undefined;
  } | null;
  consumptionReport: {
    _sum: {
      value: number;
    };
    expense_date: string;
  }[];
  categoriesExpensesReport: {
    _count: {
      id: number
    },
    category_id: number
  }[]
}

export function createInitialState(): userProps {
  return {
    user: null,
    userList: [],
    reload: false,
    filters: null,
    consumptionReport: [],
    categoriesExpensesReport: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class userStore extends Store<userProps> {
  constructor(
    private userService: IUserService,
    private notificationService: NotificationService,
    private authService: IAuthService,
    private router: Router,
    private auth: AuthService
  ) {
    super(createInitialState());
  }

  public get userList$(): Observable<User[]> {
    return this._select((store) => store.userList);
  }

  async login(email: string, password: string) {
    try {
      const result = await this.authService.login(email, password);
      this.router.navigate(['/menu/users']);
      this.notificationService.toastMessage(
        'Sesión iniciada con éxito',
        'success'
      );
      this.auth.userEmail = result.user.email + '';
      this.update((state) => ({
        ...state,
      }));
    } catch (error) {
      this.notificationService.toastMessage(
        controllerExceptions(error),
        'error'
      );
    }
  }

  setReload(reload: boolean) {
    this.update((state) => ({
      ...state,
      reload,
    }));
  }

  setFilters(params: { filterUser: string; filterState: string }) {
    console.log(params);
    this.update((state) => ({
      ...state,
      filters: {
        rol_id: params.filterUser
          ? params.filterUser == 'admin'
            ? 1
            : 2
          : undefined,
        is_active: params.filterState
          ? params.filterState == 'active'
            ? true
            : false
          : undefined,
      },
    }));
  }

  public get actualUser() {
    return this._value().user;
  }

  public get actualUserList() {
    return this._value().userList;
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

  async fetchUsers(search?: string) {
    try {
      this.notificationService.showLoading();
      const response = await this.userService.fetchUsers(
        this._value().filters,
        search
      );
      if (response.length == undefined) {
        throw new Error('database connection').message;
      }
      const userList = response.map(
        (user) =>
          ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            enabled: user.is_active,
            rol:
              user.rol_id == 1
                ? Rol.ADMIN
                : user.rol_id == 2
                ? Rol.CONSUMMER
                : Rol.SUPER_ADMIN,
          } as User)
      );
      this.update((state) => ({
        ...state,
        userList,
      }));
    } catch (error) {
      this.notificationService.toastMessage(
        controllerExceptions(error),
        'error'
      );
    }
    this.notificationService.hideLoading();
  }

  selectUser(index: number) {
    this.update((state) => ({
      user: state.userList[index],
    }));
  }

  selectPage(index: number) {
    this.router.navigate([index == 1 ? 'menu/reports' : 'menu/users']);
  }

  public get reload$() {
    return this._select((state) => state.reload);
  }

  async deleteUser() {
    try {
      this.notificationService.showLoading();
      await this.userService.deleteUser(this.actualUser?.id);
      this.update((state) => ({
        ...state,
        reload: true,
        user: null,
      }));
      this.notificationService.toastMessage(
        'Usuario eliminado exitosamente',
        'success'
      );
    } catch (error) {
      this.notificationService.toastMessage(
        controllerExceptions(error),
        'error'
      );
    }
    this.notificationService.hideLoading();
  }

  async createUser(params: {
    names: string;
    email: string;
    password: string;
    rol: string;
    enabled: boolean;
  }) {
    try {
      this.notificationService.showLoading();
      const response = await this.userService.createUser({
        ...params,
        name: params.names,
        rol_id:
          params.rol == 'Administrador'
            ? 1
            : params.rol == 'Consumidor'
            ? 2
            : 3,
        is_active: params.enabled,
      });
      this.update((state) => ({
        ...state,
        reload: true,
      }));
      this.notificationService.toastMessage(
        'Usuario creado exitosamente',
        'success'
      );
    } catch (error) {
      this.notificationService.toastMessage(
        controllerExceptions(error),
        'error'
      );
    }
  }

  async updateUser(params: {
    names: string;
    email: string;
    rol: string;
    enabled: boolean;
  }) {
    try {
      this.notificationService.showLoading();
      await this.userService.updateUser({
        id: this.actualUser?.id,
        name: params.names,
        rol_id:
          params.rol == 'Administrador'
            ? 1
            : params.rol == 'Consumidor'
            ? 2
            : 3,
        is_active: params.enabled,
        email: params.email,
      });
      this.update((state) => ({
        ...state,
        reload: true,
      }));
      this.notificationService.toastMessage(
        'Usuario actualizado exitosamente',
        'success'
      );
    } catch (error) {
      this.notificationService.toastMessage(
        controllerExceptions(error),
        'error'
      );
    }
  }

  async changeStateUser() {
    try {
      this.notificationService.showLoading();
      await this.userService.changeState({
        id: this.actualUser?.id,
        is_active: !this.actualUser?.enabled,
      });
      this.notificationService.toastMessage(
        'Estado actualizado con éxito',
        'success'
      );
      this.update((state) => ({
        ...state,
        reload: true,
        user: null,
      }));
    } catch (error) {
      this.notificationService.toastMessage('Tenemos problemas', 'error');
    }
    this.notificationService.hideLoading();
  }

  public get consumptionReport() {
    return this._value().consumptionReport;
  }

  async fetchConsumptionReport(params: {
    start: string | null;
    end: string | null;
  }) {
    try {
      this.notificationService.showLoading();
      const consumptionReport = await this.userService.fetchConsumptionReport({
        start_date: moment.utc(params.start).toDate(),
        end_date: moment.utc(params.end).toDate(),
      });
      this.update((state) => ({
        ...state,
        consumptionReport,
      }));
    } catch (error) {
      this.notificationService.toastMessage('Tenemos problemas', 'error');
    }
    this.notificationService.hideLoading();
  }

  public get categoriesExpensesReport() {
    return this._value().categoriesExpensesReport;
  }

  async fetchCategoriesExpensesReport(params: {
    start: string | null;
    end: string | null;
  }) {
    try {
      this.notificationService.showLoading();
      const categoriesExpensesReport = await this.userService.categoriesExpensesReport({
        start_date: moment.utc(params.start).toDate(),
        end_date: moment.utc(params.end).toDate(),
      });
      this.update((state) => ({
        ...state,
        categoriesExpensesReport,
      }));
    } catch (error) {
      this.notificationService.toastMessage('Tenemos problemas', 'error');
    }
    this.notificationService.hideLoading();
  }
}
