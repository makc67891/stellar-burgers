import store from '../store';
import { userMock } from './mock';
import {
  fetchGetApi,
  fetchUpdateApi,
  fetchUserLogin,
  fetchUserLogout,
  fetchUserRegister
} from './thunk';
import {
  authCheckedSelector,
  errorSelector,
  initSelector,
  userSelector
} from './user';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('user slice', () => {
  const user = () => userSelector(store.getState());
  const isInit = () => initSelector(store.getState());
  const isAuthChecked = () => authCheckedSelector(store.getState());
  const error = () => errorSelector(store.getState());

  it('FAILED tests', async () => {
    const failedRegister = {
      type: fetchUserRegister.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failedRegister);
    expect(isAuthChecked()).toBe(false);
    expect(isInit()).toBe(false);
    expect(error()).toBe('404 not found');
    expect(user()).toBeNull();

    const failedLogin = {
      type: fetchUserLogin.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failedLogin);
    expect(isAuthChecked()).toBe(false);
    expect(isInit()).toBe(true);
    expect(error()).toBe('404 not found');
    expect(user()).toBeNull();

    const failedGetApi = {
      type: fetchGetApi.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failedGetApi);
    expect(isAuthChecked()).toBe(false);
    expect(isInit()).toBe(false);
    expect(error()).toBe('404 not found');
    expect(user()).toBeNull();

    const failedUpdateApi = {
      type: fetchUpdateApi.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failedUpdateApi);
    expect(isAuthChecked()).toBe(false);
    expect(isInit()).toBe(false);
    expect(error()).toBe('404 not found');

    const failedLogout = {
      type: fetchUserLogout.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failedLogout);
    expect(isAuthChecked()).toBe(false);
    expect(isInit()).toBe(false);
    expect(error()).toBe('404 not found');
  });

  it('REQUEST tests', async () => {
    const requestRegister = { type: fetchUserRegister.pending.type };

    store.dispatch(requestRegister);
    expect(isAuthChecked()).toBe(true);
    expect(isInit()).toBe(false);
    expect(error()).toBeNull;
    expect(user()).toBeNull();

    const requestLogin = {
      type: fetchUserLogin.pending.type
    };

    store.dispatch(requestLogin);
    expect(isAuthChecked()).toBe(false);
    expect(isInit()).toBe(false);
    expect(error()).toBeNull;
    expect(user()).toBeNull();

    const requestGetApi = {
      type: fetchGetApi.pending.type
    };

    store.dispatch(requestGetApi);
    expect(isAuthChecked()).toBe(false);
    expect(isInit()).toBe(false);
    expect(error()).toBeNull;
    expect(user()).toBeNull();

    const requestUpdateApi = {
      type: fetchUpdateApi.pending.type
    };

    store.dispatch(requestUpdateApi);
    expect(isInit()).toBe(false);
    expect(error()).toBeNull;

    const requestLogout = {
      type: fetchUserLogout.pending.type
    };

    store.dispatch(requestLogout);
    expect(isAuthChecked()).toBe(false);
    expect(isInit()).toBe(false);
    expect(error()).toBeNull;
  });

  it('SUCCESS tests', async () => {
    const successRegister = {
      type: fetchUserRegister.fulfilled.type,
      payload: { user: userMock }
    };

    await store.dispatch(successRegister);
    expect(isAuthChecked()).toBe(false);
    expect(isInit()).toBe(true);
    expect(error()).toBeNull;
    expect(user()).toEqual(userMock);

    const successLogin = {
      type: fetchUserLogin.fulfilled.type,
      payload: userMock
    };

    await store.dispatch(successLogin);
    expect(isAuthChecked()).toBe(true);
    expect(isInit()).toBe(true);
    expect(error()).toBeNull;
    expect(user()).toEqual(userMock);

    const successGetApi = {
      type: fetchGetApi.fulfilled.type,
      payload: { user: userMock }
    };

    await store.dispatch(successGetApi);
    expect(isAuthChecked()).toBe(true);
    expect(isInit()).toBe(true);
    expect(error()).toBeNull;
    expect(user()).toEqual(userMock);

    const successUpdateApi = {
      type: fetchUpdateApi.fulfilled.type,
      payload: { user: userMock }
    };

    await store.dispatch(successUpdateApi);
    expect(isAuthChecked()).toBe(true);
    expect(isInit()).toBe(true);
    expect(error()).toBeNull;
    expect(user()).toEqual(userMock);

    const successLogout = {
      type: fetchUserLogout.fulfilled.type
    };

    await store.dispatch(successLogout);
    expect(isAuthChecked()).toBe(true);
    expect(isInit()).toBe(false);
    expect(error()).toBeNull;
    expect(user()).toBeNull();
  });
});
