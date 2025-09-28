import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { AppDispatch, RootState, store } from "../store/store";
import { Stack, useRouter } from "expo-router";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { STORAGE } from "@/utils/storage";
import { Platform, StyleSheet, Text, View } from "react-native";
import SafeScreen from "@/components/SafeArea";
import { AppColor } from "@/constants/colors";
import * as Notifications from "expo-notifications";
import { selectGym } from "@/store/slices/gymSlice";
import {
  fetchNotifications,
  selectUnreadCount,
  setLastSeenAt,
} from "@/store/slices/notificationsSlice";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const router = useRouter();
  // useEffect(() => {
  //   const checkUser = async () => {
  //     const accessToken = await STORAGE.getData("accessToken");

  //     try {
  //       const decodedToken = jwtDecode(accessToken);
  //       const currentTime = Date.now() / 1000;

  //       if (decodedToken.exp && decodedToken.exp > currentTime) {
  //         router.replace("/(tabs)");
  //       } else {
  //         router.replace("/(onboarding)");
  //       }
  //     } catch {
  //       router.replace("/(onboarding)");
  //     }
  //   };
  //   checkUser();
  // }, [router]);

  return (
    <Provider store={store}>
      <SnackbarProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SnackbarProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 2,
    backgroundColor: "white",
  },
  heading: {
    marginTop: 60,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "flex-end",
    color: AppColor.primary,
  },
});
