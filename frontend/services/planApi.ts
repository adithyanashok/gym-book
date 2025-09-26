import { ApiResponse, Member } from "@/types/member.types";
import { apiClient } from "./apiClient";
import { Plan } from "@/types/plan.types";

export const planApi = {
  getPlans: async () => {
    try {
      const response = await apiClient.get<ApiResponse<Plan[]>>("/plans");

      return response;
    } catch (error: any) {
      throw error;
    }
  },
};
