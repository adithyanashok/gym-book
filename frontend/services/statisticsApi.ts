import { ApiResponse } from "@/types/member.types";
import { Revanue, RevanueData, Statistics } from "@/types/statistics.types";
import { apiClient } from "./apiClient";
import { PlanDistribution } from "@/types/planDistribution.type";

export const statisticsApi = {
  getStatistics: ({ startDate }: { startDate: string }): Promise<ApiResponse<Statistics>> => {
    return apiClient<ApiResponse<Statistics>>(`/statistics?startDate=${startDate}`);
  },

  getPlanDistribution: ({ startDate }: { startDate: string }): Promise<ApiResponse<PlanDistribution[]>> => {
    return apiClient<ApiResponse<PlanDistribution[]>>(`/plans/get-plan-distribution?startDate=${startDate}`);
  },

   getMonthlyRevanues: ({ startDate }: { startDate: string }): Promise<ApiResponse<RevanueData>> => {
    return apiClient<ApiResponse<RevanueData>>(`/revanue?startDate=${startDate}`);
  },
}