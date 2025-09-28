// app/(tabs)/notifications.tsx
import NoData from "@/components/NoData";
import Loading from "@/components/Loading";
import { AppDispatch } from "@/store/store";
import {
  fetchNotifications,
  selectNotifications,
  selectNotificationsLoading,
  setLastSeenAt,
  markAllNotificationsRead,
} from "@/store/slices/notificationsSlice";
import { useEffect, useState, useCallback } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { STORAGE } from "@/utils/storage";
import { useFocusEffect } from "expo-router";

export default function NotificationsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectNotifications);
  const loading = useSelector(selectNotificationsLoading);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      const now = new Date().toISOString();
      STORAGE.storeData("notifications:lastSeenAt", now);
      dispatch(setLastSeenAt(now));
      dispatch(markAllNotificationsRead());
      // Optionally refetch after marking
      setTimeout(() => dispatch(fetchNotifications()), 200);
    }, [dispatch])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchNotifications()).unwrap();
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  if (loading && items.length === 0)
    return <Loading loadingText="Loading notifications..." />;
  if (!loading && items.length === 0)
    return <NoData emptyText="No notifications" />;

  return (
    <View style={{ padding: 12 }}>
      <FlatList
        data={items}
        keyExtractor={(n) => String(n.id)}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 12,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "600" }}>{item.title}</Text>
            <Text style={{ marginTop: 4 }}>{item.body}</Text>
            {item.sentAt ? (
              <Text style={{ marginTop: 6, opacity: 0.6 }}>
                {new Date(item.sentAt).toLocaleString()}
              </Text>
            ) : null}
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
