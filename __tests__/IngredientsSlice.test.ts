import {
  ingredientsReducer,
  getIngredients
} from '../src/services/slices/IngredientsSlice';
import { TIngredient } from '../src/utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка 1',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 250,
    price: 100,
    image: 'url_to_image',
    image_large: 'url_to_large_image',
    image_mobile: 'url_to_mobile_image'
  },
  {
    _id: '2',
    name: 'Начинка 1',
    type: 'main',
    proteins: 15,
    fat: 10,
    carbohydrates: 5,
    calories: 150,
    price: 50,
    image: 'url_to_image',
    image_large: 'url_to_large_image',
    image_mobile: 'url_to_mobile_image'
  }
];

describe('ingredientsReducer', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  test('pending state', () => {
    const action = { type: getIngredients.pending.type };

    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('fulfilled state', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('rejected state', () => {
    const errorMessage = 'Ошибка загрузки';

    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };

    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
