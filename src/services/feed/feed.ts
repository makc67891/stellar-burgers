import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { fetchFeed } from './thunk';

export interface IFeedSlice {
  feed: TOrdersData | null;
  orders: TOrder[];
  isLoading: boolean;
  error: SerializedError | null;
}

export const initialState: IFeedSlice = {
  feed: null,
  orders: [],
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feed = action.payload;
          state.orders = action.payload.orders;
          state.isLoading = false;
          state.error = null;
        }
      );
  },
  selectors: {
    feedSelector: (state) => state.feed,
    ordersSelector: (state) => state.orders,
    isLoadingSelector: (state) => state.isLoading,
    errorSelector: (state) => state.error
  }
});

export const {
  feedSelector,
  ordersSelector,
  isLoadingSelector,
  errorSelector
} = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;
