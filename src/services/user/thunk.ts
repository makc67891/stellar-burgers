import {
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { authChecked } from './user';

export const fetchGetApi = createAsyncThunk('user/getApi', getUserApi);

export const fetchUserAuth = createAsyncThunk(
  'user/auth',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(fetchGetApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const fetchUserRegister = createAsyncThunk(
  'user/register',
  registerUserApi
);

export const fetchUserLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const fetchUserLogout = createAsyncThunk('user/logout', () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const fetchUpdateApi = createAsyncThunk(
  'user/updateApi',
  async (data: Partial<TRegisterData>) => {
    await updateUserApi(data);
    return getUserApi();
  }
);
