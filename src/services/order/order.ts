import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrderByNum, fetchOrders, postOrder } from './thunk';

export interface TOrdersState {
  orders: TOrder[];
  order: TOrder | null;
  modalData: TOrder | null;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: TOrdersState = {
  orders: [],
  order: null,
  modalData: null,
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.modalData = null;
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
        state.error = action.error;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.modalData = action.payload.order;
        state.isLoading = false;
      })

      .addCase(fetchOrderByNum.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNum.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
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
        state.error = action.error;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      });
  },
  selectors: {
    ordersSelector: (state) => state.orders,
    orderSelector: (state) => state.order,
    modalDataSelector: (state) => state.modalData,
    isLoadingSelector: (state) => state.isLoading,
    errorSelector: (state) => state.error
  }
});

export const { clearOrderModalData } = orderSlice.actions;
export const {
  ordersSelector,
  orderSelector,
  modalDataSelector,
  isLoadingSelector,
  errorSelector
} = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
