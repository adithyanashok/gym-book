import { ApiResponse } from "@/types/member.types";
import { Revanue, RevanueData, Statistics } from "@/types/statistics.types";
import { apiClient } from "./apiClient";
import { PlanDistribution } from "@/types/planDistribution.type";

export const statisticsApi = {
  getStatistics: async ({ startDate }: { startDate: string }) => {
    try {
      const response = await apiClient.get<ApiResponse<Statistics>>(
        `/statistics?startDate=${startDate}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  getPlanDistribution: async ({ startDate }: { startDate: string }) => {
    try {
      const response = await apiClient.get<ApiResponse<PlanDistribution[]>>(
        `/plans/get-plan-distribution?startDate=${startDate}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  getMonthlyRevanues: async ({ startDate }: { startDate: string }) => {
    try {
      const response = await apiClient.get<ApiResponse<RevanueData>>(
        `/revanue?startDate=${startDate}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
