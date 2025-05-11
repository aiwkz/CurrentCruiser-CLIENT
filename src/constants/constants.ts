import { ApiResponse, Car, List, LoginFormData, MenuItem, RegisterFormData, User } from "@/types";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    title: 'lists',
    href: '/lists'
  }
];

export const INITIAL_DATA: ApiResponse<unknown[]> = {
  data: [] as unknown[],
  message: '',
  status: 0
};

export const INITIAL_REGISTER_FORM_STATE: RegisterFormData = {
  username: '',
  email: '',
  password: ''
};

export const INITIAL_LOGIN_FORM_STATE: LoginFormData = {
  email: '',
  password: ''
};

export const INITIAL_LIST_FORM_STATE: List = {
  _id: '',
  title: '',
  userId: '',
  cars: [],
  createdAt: '',
  updatedAt: '',
  deletedAt: null,
};

export const INITIAL_USER_DATA: User = {
  _id: '',
  username: '',
  email: '',
  password: '',
  role: 'user',
  createdAt: '',
  updatedAt: '',
  deletedAt: null,
};

export const INITIAL_CURRENT_CAR_DATA: Car = {
  _id: '',
  name: '',
  img: '',
  history: '',
  description: '',
  specifications: {
    horsepower: '',
    mph0to60: '',
    topSpeed: '',
  },
  categoryId: '',
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
  availableInMarket: false
};
