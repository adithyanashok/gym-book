import { adminApi } from "@/services/adminApi";
import { Admin, LoginOtpResponse } from "@/types/admin.type";
import { ApiResponse } from "@/types/member.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  RootState } from "../store";
import { STORAGE } from "@/utils/storage";

interface AdminState {
  loginOtpResponse:LoginOtpResponse | null,
  admin: Admin | null;
  loginLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  verifyOtp: 'idle' | 'pending' | 'succeeded' | 'failed';
  logoutLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;

}

export const adminLogin = createAsyncThunk(
    "adminlice/adminLogin",
     async ({phone}:{phone:string}, thunkAPI) => {
    try {
        const response = await adminApi.adminLogin(phone)
        return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        
    }
})

// Verify OTP
export const verifyOtp = createAsyncThunk(
    "adminlice/verifyOtp",
     async ({otp, staffId}:{otp:number, staffId:number}, thunkAPI) => {
    try {
        const response = await adminApi.verifyOtp(otp,staffId)
        STORAGE.storeData('accessToken', response.data.accessToken);
        STORAGE.storeData('refreshToken', response.data.refreshToken);
        STORAGE.storeData('userId', response.data.userId);
        return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        
    }
})

// Logout
export const logout = createAsyncThunk(
    "adminlice/logout",
     async (_, thunkAPI) => {
    try {
        const response = await adminApi.logout()
        await STORAGE.removeData('accessToken');
        await STORAGE.removeData('refreshToken');
        await STORAGE.removeData('userId');
        return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        
    }
})
// Initial state
const initialState: AdminState = {
  admin: null,
  loginOtpResponse:null,
  loginLoading: 'idle',
  verifyOtp:'idle',
  logoutLoading:'idle',
  error: null,
};

const adminSlice = createSlice({
    name:"adminSlice",
    initialState,
    reducers:{
        clearError: (state) => {
        state.error = null;
        },
        
    },
    extraReducers(builder) {
        builder.addCase(adminLogin.pending, (state) => {
            state.loginLoading = 'pending';
            state.error = null;
        }).addCase(adminLogin.fulfilled, (state, action:PayloadAction<ApiResponse<LoginOtpResponse>>) => {
            state.loginLoading = 'succeeded';
            state.error = null;

            state.loginOtpResponse = action.payload.data;
        }).addCase(adminLogin.rejected, (state, action) => {

            state.loginLoading = 'failed';
            state.error = action.payload as string;
        })

        // VERIFY OTP
        .addCase(verifyOtp.pending, (state) => {
            state.verifyOtp = 'pending';
            state.error = null;
        }).addCase(verifyOtp.fulfilled, (state, action:PayloadAction<ApiResponse<Admin>>) => {
            state.verifyOtp = 'succeeded';
            state.error = null;
            state.admin = action.payload.data;
        }).addCase(verifyOtp.rejected, (state, action) => {
            state.verifyOtp = 'failed';
            state.error = action.payload as string;
        })

        // LOGOUT
        .addCase(logout.pending, (state) => {
            state.logoutLoading = 'pending';
            state.error = null;
        }).addCase(logout.fulfilled, (state, action:PayloadAction<ApiResponse<null>>) => {
            state.logoutLoading = 'succeeded';
            state.error = null;
            state.admin = action.payload.data;
        }).addCase(logout.rejected, (state, action) => {
            state.error = 'failed';
            state.error = action.payload as string;
        })

        
    },
})

export const selectLoginResponse = (state:RootState) => state.admin.loginOtpResponse;
export const selectLoginLoading = (state:RootState) => state.admin.loginLoading;
export const selectLoginError = (state:RootState) => state.admin.error;

export const selectAdmin = (state:RootState) => state.admin.admin;
export const selectAdminLoading = (state:RootState) => state.admin.loginLoading;
export const selectAdminError = (state:RootState) => state.admin.error;

export const selectLoadingAdmin = (state:RootState) => state.admin.admin;
export const selectLoadingAdminLoading = (state:RootState) => state.admin.logoutLoading;
export const selectLoadingAdminError = (state:RootState) => state.admin.error;

export default adminSlice.reducer;