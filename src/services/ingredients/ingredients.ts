import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from './thunk';

export interface IIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    isLoadingSelector: (state) => state.isLoading,
    errorSelector: (state) => state.error
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { ingredientsSelector, isLoadingSelector, errorSelector } =
  ingredientsSlice.selectors;
