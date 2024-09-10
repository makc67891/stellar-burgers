import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  ingredientsReducer,
  ingredientsSlice
} from './ingredients/ingredients';
import {
  constructorReducer,
  constructorSlice
} from './constructor/burger-constructor';
import { userReducer, userSlice } from './user/user';
import { feedReducer, feedSlice } from './feed/feed';
import { orderReducer, orderSlice } from './order/order';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsReducer,
  [constructorSlice.name]: constructorReducer,
  [userSlice.name]: userReducer,
  [feedSlice.name]: feedReducer,
  [orderSlice.name]: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
