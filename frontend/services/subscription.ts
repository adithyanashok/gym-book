import { ApiResponse } from "@/types/member.types";
import { apiClient } from "./apiClient";
import { PaymentData, SubscriptionPlan } from "@/types/subsctiption.type";

export const subscriptionApi = {
  subscribe: async (id: number) => {
    try {
      const response = await apiClient.post<PaymentData>(
        `/subscription/payment-sheet/${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  getPlans: async () => {
    try {
      const response = await apiClient.get<ApiResponse<SubscriptionPlan[]>>(
        `/subscription/plans`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
