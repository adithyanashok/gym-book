import { AppColor } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/store/store";
import {
  selectUnreadCount,
  setLastSeenAt,
  fetchNotifications,
} from "@/store/slices/notificationsSlice";
import { STORAGE } from "@/utils/storage";
import { View } from "react-native";
import * as Notifications from "expo-notifications";
export default function TabLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const unreadCount = useSelector((s: RootState) => selectUnreadCount(s));

  useEffect(() => {
    STORAGE.getData("notifications:lastSeenAt").then((v) => {
      if (v) dispatch(setLastSeenAt(v));
    });
    dispatch(fetchNotifications());
    const receivedSub = Notifications.addNotificationReceivedListener(() => {
      dispatch(fetchNotifications());
    });
    const responseSub = Notifications.addNotificationResponseReceivedListener(
      () => {
        dispatch(fetchNotifications());
      }
    );
    return () => {
      receivedSub.remove();
      responseSub.remove();
    };
  }, [dispatch]);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: AppColor.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          // headerShown: true,

          // headerTitleAlign: "center",

          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: "Members",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome6 name="people-group" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome6 name="chart-line" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          headerShown: true,
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <Ionicons name="notifications-outline" size={24} color={color} />
              {unreadCount > 0 ? (
                <View
                  style={{
                    position: "absolute",
                    right: -2,
                    top: -2,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: AppColor.primary,
                  }}
                />
              ) : null}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="my-gym"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Gym Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
