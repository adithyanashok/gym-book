// store/slices/subscriptionSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { subscriptionApi } from "@/services/subscription";
import { PaymentData, SubscriptionPlan } from "@/types/subsctiption.type";

export const subscription = createAsyncThunk(
  "subscription/paymentsheet",
  async (id: number, { rejectWithValue }) => {
    try {
      return await subscriptionApi.subscribe(id);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const subscriptionPlans = createAsyncThunk(
  "subscription/plans",
  async (_, { rejectWithValue }) => {
    try {
      return await subscriptionApi.getPlans();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

type SubscriptionState = {
  items: PaymentData;
  plans: SubscriptionPlan[];
  loading: boolean;
  error?: string | null;
};

const initialState: SubscriptionState = {
  items: {} as PaymentData,
  plans: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscription.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(subscription.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Failed to load subscription";
      })
      .addCase(subscriptionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscriptionPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.data;
      })
      .addCase(subscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Failed to load subscription";
      });
  },
});

export const selectSubscription = (state: RootState) =>
  state.subscription.items;
export const selectSubscriptionLoading = (state: RootState) =>
  state.subscription.loading;
export const selectSubsriptionError = (state: RootState) =>
  state.subscription.error;

export const selectPlan = (state: RootState) => state.subscription.plans;
export const selectPlanLoading = (state: RootState) =>
  state.subscription.loading;
export const selectPlanError = (state: RootState) => state.subscription.error;

export default subscriptionSlice.reducer;
