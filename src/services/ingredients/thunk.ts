import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'ingridients/getIngredients',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);
