import store from '../store';
import {
  errorSelector,
  ingredientsSelector,
  isLoadingSelector
} from './ingredients';
import { fetchIngredients } from './thunk';
import { ingredientsMock } from './mock';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ingredients slice', () => {
  const ingredients = () => ingredientsSelector(store.getState());
  const isLoading = () => isLoadingSelector(store.getState());
  const error = () => errorSelector(store.getState());

  it('FAILED test', async () => {
    const failed = {
      type: fetchIngredients.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failed);
    expect(ingredients()).toEqual([]);
    expect(isLoading()).toBe(false);
    expect(error()).toBe('404 not found');
  });

  it('REQUEST test', async () => {
    const request = { type: fetchIngredients.pending.type };

    store.dispatch(request);
    expect(ingredients()).toEqual([]);
    expect(isLoading()).toBe(true);
    expect(error()).toBe(null);
  });

  it('SUCCESS test', async () => {
    const success = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredientsMock
    };

    await store.dispatch(success);
    expect(ingredients()).toEqual(ingredientsMock);
    expect(isLoading()).toBe(false);
    expect(error()).toBe(null);
  });
});
