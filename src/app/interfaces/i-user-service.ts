export abstract class IUserService {
  
  abstract categoriesExpensesReport(body: {
    start_date: Date | null;
    end_date: Date | null;
  }): Promise<
    {
      _count: {
        id: number;
      };
      category_id: number;
    }[]
  >;

  abstract fetchConsumptionReport(body: {
    start_date: Date | null;
    end_date: Date | null;
  }): Promise<
    {
      _sum: {
        value: number;
      };
      expense_date: string;
    }[]
  >;

  abstract changeState(body: {
    id: number | undefined;
    is_active: boolean;
  }): Promise<boolean>;

  abstract updateUser(params: {
    id: number | undefined;
    name: string;
    rol_id: number;
    is_active: boolean;
    email: string;
  }): Promise<boolean>;

  abstract fetchUsers(
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
  >;

  abstract deleteUser(id: number | undefined): Promise<boolean>;

  abstract createUser(params: {
    rol_id: number;
    name: string;
    email: string;
    password: string;
    is_active: boolean;
  }): Promise<boolean>;
}
