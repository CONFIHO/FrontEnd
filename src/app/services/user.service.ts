import { Injectable } from '@angular/core';
import { IUserService } from '../interfaces/i-user-service';
import { HttpClient } from '@angular/common/http';
import { API_UTL } from '../utils/constants';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  constructor(private http: HttpClient) {}

  async fetchUsers(
    page: number,
    per_page: number,
    searchFilter?: string
  ): Promise<{ items: User[]; total: number }> {
    return firstValueFrom(this.http.get<{ items: User[]; total: number }>(`${API_UTL}/users`));
  }
}
