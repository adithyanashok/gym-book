import { ApiResponse, Member } from "@/types/member.types";
import { apiClient } from "./apiClient";
import { Plan } from "@/types/plan.types";


export const planApi = {
  getPlans: (): Promise<ApiResponse<Plan[]>> => {
    return apiClient<ApiResponse<Plan[]>>(`/plans`);
  },
}