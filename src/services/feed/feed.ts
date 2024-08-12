import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { fetchFeed } from './thunk';

export interface IFeedSlice {
  feed: TOrdersData | null;
  orders: TOrder[];
  isLoading: boolean;
  error: string | null | undefined;
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
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feed = action.payload;
          state.orders = action.payload.orders;
          state.isLoading = false;
        }
      );
  },
  selectors: {
    feedSelector: (state) => state.feed,
    ordersSelector: (state) => state.orders,
    isLoadingSelector: (state) => state.isLoading
  }
});

export const { feedSelector, ordersSelector, isLoadingSelector } =
  feedSlice.selectors;
export const feedReducer = feedSlice.reducer;
