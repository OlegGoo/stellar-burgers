import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

type TOrderState = {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
  error: string | null;
};

export const initialState: TOrderState = {
  orderModalData: null,
  orderRequest: false,
  loading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orderModalData = null;
      state.loading = false;
      state.orderRequest = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.orderRequest = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      }),
      builder
        .addCase(getOrderByNumber.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getOrderByNumber.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || null;
        })
        .addCase(getOrderByNumber.fulfilled, (state, action) => {
          state.loading = false;
          state.orderModalData = action.payload?.orders?.[0];
        });
  }
});

export const { clearOrders } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
