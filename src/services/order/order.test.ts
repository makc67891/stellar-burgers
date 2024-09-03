import store from '../store';
import {
  errorSelector,
  isLoadingSelector,
  modalDataSelector,
  ordersSelector
} from './order';
import { fetchOrders } from './thunk';
import { userOrdersMock } from './mock';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('order slice', () => {
  const orders = () => ordersSelector(store.getState());
  const modalData = () => modalDataSelector(store.getState());
  const isLoading = () => isLoadingSelector(store.getState());
  const error = () => errorSelector(store.getState());

  it('FAILED test', async () => {
    const failed = {
      type: fetchOrders.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failed);
    expect(orders()).toEqual([]);
    expect(modalData()).toBeNull();
    expect(isLoading()).toBe(false);
    expect(error()).toBe('404 not found');
  });

  it('REQUEST test', async () => {
    const request = { type: fetchOrders.pending.type };

    store.dispatch(request);
    expect(orders()).toEqual([]);
    expect(modalData()).toBeNull();
    expect(isLoading()).toBe(true);
    expect(error()).toBe(null);
  });

  it('SUCCESS test', async () => {
    const success = {
      type: fetchOrders.fulfilled.type,
      payload: userOrdersMock
    };

    await store.dispatch(success);
    expect(orders()).toEqual(userOrdersMock);
    expect(isLoading()).toBe(false);
    expect(error()).toBe(null);
  });
});
