import {
  addIngredient,
  constructorSlice,
  deleteIngredient,
  initialState,
  moveDownIngredient,
  moveUpIngredient
} from './burger-constructor';
import {
  bunIngredientMock,
  deleteConstructorMock,
  deletedIngredientMock,
  ingredientMock,
  ingredientsConstructorMock,
  moveDownConstructorMock
} from './mock';

const reducer = constructorSlice.reducer;

afterEach(() => {
  jest.restoreAllMocks();
});

describe('конструктор бургера', () => {
  it('добавление ингредиента', () => {
    const result = reducer(initialState, addIngredient(ingredientMock));
    const { ingredients } = result;
    expect(ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0945');
  });

  it('добавление булки', () => {
    const result = reducer(initialState, addIngredient(bunIngredientMock));
    const { bun } = result;
    expect(bun?._id).toBe('643d69a5c3f7b9001cfa093d');
  });

  it('удаление ингредиента', () => {
    const result = reducer(
      { ...initialState, ingredients: ingredientsConstructorMock },
      deleteIngredient(deletedIngredientMock)
    );
    const { ingredients } = result;
    expect(ingredients).toEqual(deleteConstructorMock);
  });

  it('изменение порядков ингредиентов', () => {
    const state = {
      ...initialState,
      ingredients: ingredientsConstructorMock
    };

    const down = reducer(state, moveDownIngredient(0));
    let { ingredients } = down;
    expect(ingredients).toEqual(moveDownConstructorMock);

    const up = reducer(down, moveUpIngredient(1));
    ingredients = up.ingredients;
    expect(ingredients).toEqual(ingredientsConstructorMock);
  });
});
