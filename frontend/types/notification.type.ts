// types/notification.type.ts
export type NotificationItem = {
  id: number;
  title: string;
  body: string;
  sentAt: string | null;
  readAt?: string | null;
  scheduledFor?: string | null;
  type: string;
  createdAt: string;
  member?: {
    id: number;
    name?: string;
  } | null;
};
