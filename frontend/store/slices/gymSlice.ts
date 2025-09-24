import { gymApi } from "@/services/gymApi";
import { GymData } from "@/types/gym.type";
import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";

interface GymState {
  gym: GymData | null;
  loading: boolean;
  error: string | null;
  status: boolean;
}

const initialState: GymState = {
  gym: null,
  loading: false,
  status: false,
  error: null,
};

export const createGym = createAsyncThunk(
  "gymSlice/createGym",
  async ({ data }: { data: GymData }, thunkAPI) => {
    try {
      const res = await gymApi.createGym(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Error Occured!"
      );
    }
  }
);

const gymSlice = createSlice({
  name: "gymSlice",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetMembers: (state) => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createGym.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGym.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
      });
  },
});

export const { clearError, resetMembers } = gymSlice.actions;

export default gymSlice.reducer;
