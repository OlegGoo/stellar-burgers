import {
  initialState,
  constructorReducer,
  addIngredients,
  removeIngredients,
  moveIngredientUp,
  moveIngredientDown
} from '../src/services/slices/constructorSlice';
import { TConstructorIngredient } from '../src/utils/types';

describe('constructorReducer', () => {
  test('добавление булочки', () => {
    const bun: TConstructorIngredient = {
      _id: '1',
      id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      price: 100,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const newState = constructorReducer(initialState, addIngredients(bun));

    expect(newState.bun).toMatchObject({
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      price: 100,
      image: '',
      image_large: '',
      image_mobile: ''
    });

    expect(newState.ingredients).toHaveLength(0);
  });

  test('добавление ингредиента', () => {
    const ingredient: TConstructorIngredient = {
      _id: '2',
      id: '2',
      name: 'Начинка',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 2,
      calories: 5,
      price: 10,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const newState = constructorReducer(
      initialState,
      addIngredients(ingredient)
    );

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject({
      _id: '2',
      name: 'Начинка'
    });
  });

  test('удаление ингредиента', () => {
    const ingredient1 = {
      _id: '2',
      id: '2',
      name: 'Начинка',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 2,
      calories: 5,
      price: 10,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const ingredient2 = {
      _id: '3',
      id: '3',
      name: 'Котлета',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 3,
      calories: 10,
      price: 15,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const stateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const newState = constructorReducer(
      stateWithIngredients,
      removeIngredients('2')
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject(ingredient2);
  });

  test('перемещение ингредиента вверх', () => {
    const ingredient1 = {
      _id: '1',
      id: '1',
      name: 'Котлета',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 2,
      calories: 5,
      price: 10,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const ingredient2 = {
      _id: '2',
      id: '2',
      name: 'Лук',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 3,
      calories: 10,
      price: 15,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const stateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const newState = constructorReducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );

    expect(newState.ingredients[0]).toMatchObject(ingredient2);
    expect(newState.ingredients[1]).toMatchObject(ingredient1);
  });

  test('перемещение ингредиента вниз', () => {
    const ingredient1 = {
      _id: '1',
      id: '1',
      name: 'Котлета',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 2,
      calories: 5,
      price: 10,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const ingredient2 = {
      _id: '2',
      id: '2',
      name: 'Лук',
      type: 'main',
      proteins: 1,
      fat: 0,
      carbohydrates: 3,
      calories: 10,
      price: 15,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const stateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const newState = constructorReducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );

    expect(newState.ingredients[0]).toMatchObject(ingredient2);
    expect(newState.ingredients[1]).toMatchObject(ingredient1);
  });
});
