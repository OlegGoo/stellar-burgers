import {
  initialState,
  feedReducer,
  getFeed
} from '../src/services/slices/feedSlice';
import { TOrder } from '../src/utils/types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Бургер 1',
    createdAt: '2024',
    updatedAt: '2024',
    number: 101,
    ingredients: ['ingredient1', 'ingredient2']
  },
  {
    _id: '2',
    status: 'pending',
    name: 'Бургер 2',
    createdAt: '2024',
    updatedAt: '2024',
    number: 102,
    ingredients: ['ingredient3']
  }
];

const mockApiResponse = {
  orders: mockOrders,
  total: 2,
  totalToday: 1
};

describe('feedReducer', () => {
  test('pending state', () => {
    const action = { type: getFeed.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('fulfilled state', () => {
    const action = { type: getFeed.fulfilled.type, payload: mockApiResponse };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(mockApiResponse.total);
    expect(state.totalToday).toBe(mockApiResponse.totalToday);
  });

  test('rejected state', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: getFeed.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
