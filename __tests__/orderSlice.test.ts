import {
  orderReducer,
  createOrder,
  getOrderByNumber,
  clearOrders
} from '../src/services/slices/orderSlice';
import { TOrder } from '../src/utils/types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Бургер 1',
  createdAt: '2024',
  updatedAt: '2024',
  number: 101,
  ingredients: ['ingredient1', 'ingredient2']
};

describe('orderReducer', () => {
  const initialState = {
    orderModalData: null,
    orderRequest: false,
    loading: false,
    error: null
  };

  test('createOrder pending state', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.orderRequest).toBe(true);
  });

  test('createOrder fulfilled state', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.orderRequest).toBe(false);
  });

  test('createOrder rejected state', () => {
    const errorMessage = 'Ошибка создания заказа';
    const action = {
      type: createOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orderRequest).toBe(false);
  });

  test('getOrderByNumber pending state', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('getOrderByNumber fulfilled state', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  test('getOrderByNumber rejected state', () => {
    const errorMessage = 'Ошибка получения заказа';
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('clearOrders action', () => {
    const mockedState = {
      ...initialState,
      orderModalData: mockOrder,
      loading: true,
      orderRequest: true,
      error: 'Some error'
    };
    const state = orderReducer(mockedState, clearOrders());

    expect(state.orderModalData).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(null);
  });
});
