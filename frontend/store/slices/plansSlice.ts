// store/slices/PlansSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse,  } from '@/types/member.types';
import { RootState } from '../store';
import { Plan } from '@/types/plan.types';
import { planApi } from '@/services/planApi';


// Define the state interface
interface PlansState {
  items: Plan[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;

}

// Initial state
const initialState: PlansState = {
  items: [],
  loading: 'idle',
  error: null,

};

// Create the async thunk with proper typing
export const fetchPlans = createAsyncThunk(
  'plans/fetch-plans',
  async (_, thunkAPI) => {
    try {
      const response = await planApi.getPlans();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

// Create the slice
const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetPlans: (state) => {
      state.items = [];
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action: PayloadAction<ApiResponse<Plan[]>>) => {
        state.loading = 'succeeded';
        state.error = null;
        state.items = action.payload.data;
    
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearError, resetPlans } = plansSlice.actions;

// Selectors (useful for accessing state in components)
export const selectedPlans = (state: RootState) => state.plans.items;
export const selectPlansLoading = (state: RootState) => state.plans.loading;
export const selectPlansError = (state: RootState) => state.plans.error;

// Export the reducer
export default plansSlice.reducer;