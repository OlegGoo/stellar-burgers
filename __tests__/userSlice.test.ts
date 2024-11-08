import {
  userReducer,
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  getUserOrders,
  forgotPassword,
  resetPassword,
  checkUserAuth
} from '../src/services/slices/userSlice';
import { TUser, TOrder } from '../src/utils/types';

const mockUser: TUser = {
  email: 'test@yandex.ru',
  name: 'Test User'
};

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Бургер 1',
    createdAt: '2024',
    updatedAt: '2024',
    number: 101,
    ingredients: ['ingredient1', 'ingredient2']
  }
];

describe('userReducer', () => {
  const initialState = {
    isAuthChecked: false,
    orders: [],
    user: null,
    loading: false,
    error: null
  };

  test('loginUser pending state', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('loginUser fulfilled state', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  test('loginUser rejected state', () => {
    const errorMessage = 'Ошибка входа';
    const action = {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.isAuthChecked).toBe(true);
  });

  test('registerUser pending state', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('registerUser fulfilled state', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  test('registerUser rejected state', () => {
    const errorMessage = 'Ошибка регистрации';
    const action = {
      type: registerUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.isAuthChecked).toBe(true);
  });

  test('logoutUser pending state', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('logoutUser fulfilled state', () => {
    const mockedState = {
      ...initialState,
      user: mockUser,
      loading: true
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(mockedState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toBe(null);
  });

  test('updateUser pending state', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  test('updateUser fulfilled state', () => {
    const updatedMockUser = { ...mockUser, name: 'Updated User' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: updatedMockUser
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(updatedMockUser);
    expect(state.error).toBe(null);
  });

  test('getUserOrders pending state', () => {
    const action = { type: getUserOrders.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('getUserOrders fulfilled state', () => {
    const action = { type: getUserOrders.fulfilled.type, payload: mockOrders };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  test('forgotPassword pending state', () => {
    const action = { type: forgotPassword.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });
  test('forgotPassword rejected state', () => {
    const errorMessage = 'Ошибка отправки';
    const action = {
      type: forgotPassword.rejected.type,
      error: { message: errorMessage }
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('forgotPassword fulfilled state', () => {
    const action = { type: forgotPassword.fulfilled.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
  });

  test('resetPassword pending state', () => {
    const action = { type: resetPassword.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('resetPassword rejected state', () => {
    const errorMessage = 'Ошибка сброса пароля';
    const action = {
      type: resetPassword.rejected.type,
      error: { message: errorMessage }
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('resetPassword fulfilled state', () => {
    const action = { type: resetPassword.fulfilled.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
  });

  test('checkUserAuth pending state', () => {
    const action = { type: checkUserAuth.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  test('checkUserAuth fulfilled state', () => {
    const action = { type: checkUserAuth.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  test('checkUserAuth rejected state', () => {
    const action = { type: checkUserAuth.rejected.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBe(null);
  });
});
