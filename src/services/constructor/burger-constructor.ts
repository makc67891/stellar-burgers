import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';

export interface IConstructorState {
  bun: null | TConstructorIngredient;
  ingredients: TConstructorIngredient[];
}

export const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload.id
      );
    },
    moveUpIngredient(state, action) {
      const index = action.payload;
      if (index > 0) {
        state.ingredients[index] = state.ingredients.splice(
          index - 1,
          1,
          state.ingredients[index]
        )[0];
      }
    },
    moveDownIngredient(state, action) {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        state.ingredients[index] = state.ingredients.splice(
          index + 1,
          1,
          state.ingredients[index]
        )[0];
      }
    },
    resetState: (state) => (state = initialState)
  },
  selectors: {
    stateSelector: (state) => state
  }
});

export const constructorReducer = constructorSlice.reducer;
export const { stateSelector } = constructorSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetState
} = constructorSlice.actions;
