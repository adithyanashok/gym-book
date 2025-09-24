import { GymData } from "@/types/gym.type";
import { apiClient } from "./apiClient";
import { ApiResponse } from "@/types/member.types";

export const gymApi = {
  createGym: async (data: GymData) => {
    return apiClient<ApiResponse<{ gymId: number }>>("/gym", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
