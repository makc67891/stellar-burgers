import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchGetApi,
  fetchUserLogin,
  fetchUserLogout,
  fetchUserRegister
} from './thunk';

interface IUserState {
  user: TUser | null;
  isInit: boolean;
  isAuthChecked: boolean;
  error: SerializedError | null;
}

const initialState: IUserState = {
  user: null,
  isInit: false,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetApi.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(fetchGetApi.rejected, (state) => {
        state.isInit = false;
        state.isAuthChecked = false;
      })
      .addCase(fetchGetApi.fulfilled, (state, action) => {
        state.isInit = true;
        state.user = action.payload.user;
      })
      .addCase(fetchUserRegister.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error;
      })
      .addCase(fetchUserRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = false;
        state.isInit = true;
        state.error = null;
      })
      .addCase(fetchUserLogin.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.isInit = true;
        state.error = action.error;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isInit = true;
        state.error = null;
      })
      .addCase(fetchUserLogout.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(fetchUserLogout.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error;
      })
      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isInit = false;
        state.user = null;
      });
  },
  selectors: {
    userSelector: (state) => state.user,
    authCheckedSelector: (state) => state.isAuthChecked,
    initSelector: (state) => state.isInit,
    errorSelector: (state) => state.error
  }
});

export const {
  userSelector,
  authCheckedSelector,
  initSelector,
  errorSelector
} = userSlice.selectors;
export const { authChecked } = userSlice.actions;
export const userReducer = userSlice.reducer;
