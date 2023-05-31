import { Injectable } from '@angular/core';
import { IUserService } from '../interfaces/i-user-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../utils/constants';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  constructor(private http: HttpClient) {}

  changeState(body: {
    id: number | undefined;
    is_active: boolean;
  }): Promise<boolean> {
    return firstValueFrom(this.http.put<boolean>(`${API_URL}/users`, body));
  }

  updateUser(body: {
    id: number | undefined;
    name: string;
    rol_id: number;
    is_active: boolean;
    names: string;
    email: string;
    password: string;
    rol: string;
    enabled: boolean;
  }): Promise<boolean> {
    return firstValueFrom(this.http.put<boolean>(`${API_URL}/users`, body));
  }

  async fetchUsers(
    filters: {
      rol_id: number | undefined;
      is_active: boolean | undefined;
    } | null,
    search?: string
  ): Promise<
    {
      id: number;
      name: string;
      email: string;
      password: string;
      code: string;
      rol_id: number;
      is_active: boolean;
    }[]
  > {
    let params = new HttpParams();
    if (filters && filters.is_active != undefined) {
      console.log('entro', filters);
      params = params.append('is_active', filters.is_active);
    }
    if (search) {
      params = params.append('name', search);
    }
    if (filters && filters.rol_id) {
      params = params.append('rol_id', filters.rol_id);
    }
    return firstValueFrom(
      this.http.get<
        {
          id: number;
          name: string;
          email: string;
          password: string;
          code: string;
          rol_id: number;
          is_active: boolean;
        }[]
      >(`${API_URL}/users`, { params })
    );
  }

  deleteUser(id: number): Promise<boolean> {
    return firstValueFrom(this.http.delete<boolean>(`${API_URL}/users/${id}`));
  }

  createUser(body: {
    rol_id: number;
    name: string;
    email: string;
    password: string;
    is_active: boolean;
  }): Promise<boolean> {
    return firstValueFrom(this.http.post<boolean>(`${API_URL}/users`, body));
  }

  fetchConsumptionReport(body: {
    start_date: Date | null;
    end_date: Date | null;
  }): Promise<
    {
      _sum: {
        value: number;
      };
      expense_date: string;
    }[]
  > {
    console.log(body)
    return firstValueFrom(
      this.http.post<
        {
          _sum: {
            value: number;
          };
          expense_date: string;
        }[]
      >(`${API_URL}/expenses/consumptionReport`, body)
    );
  }

  categoriesExpensesReport(body: {
    start_date: Date | null;
    end_date: Date | null;
  }): Promise<{ _count: { id: number }; category_id: number }[]> {
    return firstValueFrom(
      this.http.post<
        {
          _count: {
            id: number;
          };
          category_id: number;
        }[]
      >(`${API_URL}/expenses/categoriesExpensesReport`, body)
    );
  }
}
