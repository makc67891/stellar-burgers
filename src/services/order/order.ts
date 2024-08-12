import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrderByNum, fetchOrders, postOrder } from './thunk';

export interface TOrdersState {
  orders: TOrder[];
  order: TOrder | null;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: TOrdersState = {
  orders: [],
  order: null,
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.order = action.payload;
    },
    clearOrderModalData: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
      })

      .addCase(fetchOrderByNum.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNum.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderByNum.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      });
  },
  selectors: {
    ordersSelector: (state) => state.orders,
    orderSelector: (state) => state.order,
    isLoadingSelector: (state) => state.isLoading
  }
});

export const { clearOrderModalData } = orderSlice.actions;
export const { ordersSelector, orderSelector, isLoadingSelector } =
  orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
