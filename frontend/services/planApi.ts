import { ApiResponse, Member } from "@/types/member.types";
import { apiClient } from "./apiClient";
import { PlanData } from "@/types/plan.type";

export const planApi = {
  getPlans: async () => {
    try {
      const response = await apiClient.get<ApiResponse<PlanData[]>>("/plans");

      return response;
    } catch (error: any) {
      throw error;
    }
  },

  addPlan: async (plan: PlanData) => {
    try {
      const response = await apiClient.post<ApiResponse<PlanData>>(
        "/plans",
        plan
      );

      return response;
    } catch (error: any) {
      throw error;
    }
  },
};
