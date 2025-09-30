import { EditGymType, Gym, GymData, VerifyOtpData } from "@/types/gym.type";
import { apiClient } from "./apiClient";
import { ApiResponse } from "@/types/member.types";
import { GymCredential } from "@/types/admin.type";
import { STORAGE } from "@/utils/storage";

export const gymApi = {
  gymSignup: async (phoneNumber: string) => {
    try {
      const response = await apiClient.post<ApiResponse<{ gymId: number }>>(
        "/auth/signup/otp",
        { phoneNumber }
      );

      return response;
    } catch (error: any) {
      console.log("GYM Signup error:", error);

      throw error;
    }
  },
  gymLogin: async (phoneNumber: string) => {
    try {
      const response = await apiClient.post<ApiResponse<{ gymId: number }>>(
        "/auth/login/otp",
        { phoneNumber }
      );

      return response;
    } catch (error: any) {
      console.log("GYM Login error:", error);

      throw error;
    }
  },
  verifyOtp: async (body: VerifyOtpData) => {
    try {
      const response = await apiClient.post<ApiResponse<GymCredential>>(
        "/auth/otp-verify",
        body
      );
      return response;
    } catch (error: any) {
      console.log("OTP verification error:", error);

      throw error;
    }
  },
  addGymDetails: async (body: GymData) => {
    console.log("Making Add Gym Details request:", body);

    try {
      const response = await apiClient.patch<ApiResponse<Gym>>("/gym", body);

      return response;
    } catch (error: any) {
      console.log(" Add Gym Details error:", error);

      throw error;
    }
  },

  getGym: async () => {
    try {
      const response = await apiClient.get<ApiResponse<Gym>>("/gym");

      return response;
    } catch (error: any) {
      console.log(" Get Gym Details error:", error);

      throw error;
    }
  },

  editGym: async (body: EditGymType) => {
    console.log("Making update Details request:", body);

    try {
      const response = await apiClient.patch<ApiResponse<Gym>>(
        "/gym/update",
        body
      );

      console.log("update Details success:", response);
      return response;
    } catch (error: any) {
      console.log(" update Details error:", error);

      throw error;
    }
  },

  updateSubscription: async (id: number) => {
    try {
      const response = await apiClient.patch<ApiResponse<Gym>>(
        `/subscription/update/${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
      // Clear tokens on logout
      await STORAGE.removeData("accessToken");
      await STORAGE.removeData("refreshToken");
    } catch (error) {
      // Clear tokens even if logout fails
      await STORAGE.removeData("accessToken");
      await STORAGE.removeData("refreshToken");
      throw error;
    }
  },
};
