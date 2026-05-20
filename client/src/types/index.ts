export interface Department {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  departmentId: number;
  department: Department;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  departmentId: number;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  departmentId?: number;
}

export interface UsersQueryParams {
  search?: string;
  sortBy?: 'firstName' | 'lastName' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ApiError {
  error: string;
  details?: { field: string; message: string }[];
}
