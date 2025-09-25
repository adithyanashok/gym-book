import { ApiResponse, Member } from "@/types/member.types";
import { apiClient } from "./apiClient";
import { Plan } from "@/types/plan.types";

export const planApi = {
  gymSignup: async (phoneNumber: string) => {
    try {
      const response = await apiClient.post<ApiResponse<{ gymId: number }>>(
        "/auth/signup/otp",
        { phoneNumber }
      );

      console.log("GYM Signup success:", response);
      return response;
    } catch (error: any) {
      console.log("GYM Signup error:", error);

      throw error;
    }
  },
  getPlans: async () => {
    try {
      const response = await apiClient.get<ApiResponse<Plan[]>>("/plans");

      console.log("GYM Plan success:", response);
      return response;
    } catch (error: any) {
      console.log("GYM plan error:", error);

      throw error;
    }
  },
};
