export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface CarSpecifications {
  horsepower: string;
  mph0to60: string;
  topSpeed: string;
}

export interface Car {
  _id: string;
  name: string;
  img: string;
  history: string;
  description: string;
  specifications: CarSpecifications;
  availableInMarket: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface List {
  _id: string;
  title: string;
  userId: string;
  cars: Car[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export interface MenuItem {
  id: number;
  title: string;
  href: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export type CreateListPayload = {
  user_id: string;
  title: string;
  cars: string[];
};

export type UpdateListPayload = {
  title?: string;
  cars?: string[];
};
