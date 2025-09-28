// store/slices/notificationsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notificationApi } from "@/services/notificationApi";
import type { RootState } from "@/store/store";
import type { NotificationItem } from "@/types/notification.type";

export const fetchNotifications = createAsyncThunk<NotificationItem[]>(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await notificationApi.getMyNotifications();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk<void>(
  "notifications/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      await notificationApi.markAllRead();
      return;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

type NotificationsState = {
  items: NotificationItem[];
  loading: boolean;
  error?: string | null;
  lastSeenAt: string | null;
};

const initialState: NotificationsState = {
  items: [],
  loading: false,
  error: null,
  lastSeenAt: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setLastSeenAt(state, action: PayloadAction<string | null>) {
      state.lastSeenAt = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Failed to load notifications";
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        // Optimistically set readAt for all items
        const now = new Date().toISOString();
        state.items = state.items.map((n) => ({
          ...n,
          readAt: n.readAt ?? now,
        }));
      });
  },
});

export const selectNotifications = (state: RootState) =>
  state.notifications.items;
export const selectNotificationsLoading = (state: RootState) =>
  state.notifications.loading;
export const selectNotificationsError = (state: RootState) =>
  state.notifications.error;
export const selectLastSeenAt = (state: RootState) =>
  state.notifications.lastSeenAt;
export const selectUnreadCount = (state: RootState) =>
  state.notifications.items.filter((n) => !n.readAt).length;

export const { setLastSeenAt } = notificationsSlice.actions;
export default notificationsSlice.reducer;
