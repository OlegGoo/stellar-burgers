import { store, rootReducer } from '../src/services/store';

describe('rootReducer', () => {
  test('должен возвращать начальное состояние при передаче неизвестного действия', () => {
    const actualState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const expectedState = store.getState();

    expect(actualState).toEqual(expectedState);
  });
});
