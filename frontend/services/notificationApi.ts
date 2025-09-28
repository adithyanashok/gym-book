// services/notificationApi.ts
import { apiClient } from "@/services/apiClient";
import type { NotificationItem } from "../types/notification.type";
import type { ApiResponse } from "@/types/member.types";

export const notificationApi = {
  getMyNotifications: async (): Promise<NotificationItem[]> => {
    const res = await apiClient.get<ApiResponse<NotificationItem[]>>(
      "/notification"
    );
    return res.data;
  },
  markAllRead: async (): Promise<void> => {
    await apiClient.patch<ApiResponse<null>>("/notification/read");
  },
};
