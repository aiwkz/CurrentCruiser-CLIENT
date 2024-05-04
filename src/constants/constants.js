export const MENU_ITEMS = [
  {
    id: 1,
    title: 'lists',
    href: '/lists'
  }
];

export const INITIAL_DATA = {
  data: [],
  msg: '',
  status: ''
};

export const INITIAL_REGISTER_FORM_STATE = {
  username: '',
  email: '',
  password: ''
};

export const INITIAL_LOGIN_FORM_STATE = {
  email: '',
  password: ''
};

export const INITIAL_CREATE_LIST_FORM_STATE = {
  title: '',
  cars: []
};

export const INITIAL_USER_DATA = {
  username: '',
  email: '',
  password: '',
  created_at: '',
  updated_at: '',
  deleted_at: ''
};

export const INITIAL_CURRENT_CAR_DATA = {
  _id: '',
  name: '',
  img: '',
  history: '',
  description: '',
  specifications: {},
  category_id: '',
  created_at: '',
  updated_at: '',
  deleted_at: '',
  available_in_market: false
};
