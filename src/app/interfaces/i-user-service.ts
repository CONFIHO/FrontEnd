import { User } from '../models/User';

export abstract class IUserService {
  abstract fetchUsers(
    page: number,
    per_page: number,
    searchFilter?: string
  ): Promise<{ items: User[]; total: number }>;
}
