import store from '../store';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
  ordersSelector
} from './feed';
import { fetchFeed } from './thunk';
import { feedMock } from './mock';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('feed slice', () => {
  const feed = () => feedSelector(store.getState());
  const orders = () => ordersSelector(store.getState());
  const isLoading = () => isLoadingSelector(store.getState());
  const error = () => errorSelector(store.getState());

  it('FAILED test', async () => {
    const failed = {
      type: fetchFeed.rejected.type,
      error: '404 not found'
    };

    await store.dispatch(failed);

    expect(orders()).toEqual([]);
    expect(feed()).toBeNull();
    expect(isLoading()).toBe(false);
    expect(error()).toBe('404 not found');
  });

  it('REQUEST test', async () => {
    const request = { type: fetchFeed.pending.type };

    store.dispatch(request);

    expect(orders()).toEqual([]);
    expect(feed()).toBeNull();
    expect(isLoading()).toBe(true);
    expect(error()).toBe(null);
  });

  it('SUCCESS test', async () => {
    const success = {
      type: fetchFeed.fulfilled.type,
      payload: feedMock
    };

    await store.dispatch(success);

    expect(orders()).toEqual(feedMock.orders);
    expect(feed()).toEqual(feedMock);
    expect(isLoading()).toBe(false);
    expect(error()).toBe(null);
  });
});
