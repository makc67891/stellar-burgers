import store, { rootReducer } from './store';

describe('тест root reducer', () => {
  it('проверяет правильную инициализацию', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(store.getState());
  });
});
