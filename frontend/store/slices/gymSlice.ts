import { gymApi } from "@/services/gymApi";
import { GymCredential } from "@/types/admin.type";
import { Gym, GymData, OtpData } from "@/types/gym.type";
import { ApiResponse } from "@/types/member.types";
import { STORAGE } from "@/utils/storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface GymState {
  gym: Gym | null;
  loading: boolean;
  error: string | null;
  status: boolean;
  gymCredentials: GymCredential | null;
}

const initialState: GymState = {
  gym: null,
  loading: false,
  status: false,
  error: null,
  gymCredentials: null,
};

// export const createGym = createAsyncThunk(
//   "gymSlice/createGym",
//   async ({ data }: { data: GymData }, thunkAPI) => {
//     try {
//       const res = await gymApi.createGym(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const gymSignup = createAsyncThunk(
  "gymSlice/gymSignup",
  async (phone: string, thunkAPI) => {
    try {
      const res = await gymApi.gymSignup(phone);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const gymLogin = createAsyncThunk(
  "gymSlice/gymLogin",
  async (phone: string, thunkAPI) => {
    try {
      const res = await gymApi.gymLogin(phone);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "gymSlice/verifyOtp",
  async (body: OtpData, thunkAPI) => {
    try {
      const response = await gymApi.verifyOtp(body);

      STORAGE.storeData("accessToken", response.data.accessToken);
      STORAGE.storeData("refreshToken", response.data.refreshToken);
      STORAGE.storeData("gymId", response.data.gymId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addGymDetails = createAsyncThunk(
  "gymSlice/addGymDetails",
  async (body: GymData, thunkAPI) => {
    try {
      const response = await gymApi.addGymDetails(body);
      return response;
    } catch (error) {
      console.log("SLICE: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGym = createAsyncThunk(
  "gymSlice/getGym",
  async (_, thunkAPI) => {
    try {
      const response = await gymApi.getGym();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      .addCase(gymSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        gymSignup.fulfilled,
        (state, action: PayloadAction<ApiResponse<{ gymId: number }>>) => {
          state.loading = false;
          state.status = true;
        }
      )
      .addCase(gymSignup.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        verifyOtp.fulfilled,
        (state, action: PayloadAction<ApiResponse<GymCredential>>) => {
          state.loading = false;
          state.status = true;
          state.gymCredentials = action.payload.data;
        }
      )
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload as string;
      })
      .addCase(gymLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        gymLogin.fulfilled,
        (state, action: PayloadAction<ApiResponse<{ gymId: number }>>) => {
          state.loading = false;
          state.status = true;
        }
      )
      .addCase(gymLogin.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload as string;
      })
      .addCase(addGymDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addGymDetails.fulfilled,
        (state, action: PayloadAction<ApiResponse<Gym>>) => {
          state.loading = false;
          state.status = true;
          state.gym = action.payload.data;
        }
      )
      .addCase(addGymDetails.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload as string;
      })
      .addCase(getGym.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getGym.fulfilled,
        (state, action: PayloadAction<ApiResponse<Gym>>) => {
          state.loading = false;
          state.status = true;
          state.gym = action.payload.data;
        }
      )
      .addCase(getGym.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetMembers } = gymSlice.actions;

export const selectGym = (state: RootState) => state.gym.gym;
export const selectGymLoading = (state: RootState) => state.gym.loading;
export const selectGymError = (state: RootState) => state.gym.error;

export default gymSlice.reducer;
