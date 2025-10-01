import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { store } from "../store/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import React from "react";

import * as Notifications from "expo-notifications";

import { StripeProvider } from "@stripe/stripe-react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
export default function RootLayout() {
  return (
    <StripeProvider
      merchantIdentifier="com.adithyanashokpv.gymapp"
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK!}
    >
      <Provider store={store}>
        <SnackbarProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(onboarding)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </SnackbarProvider>
      </Provider>
    </StripeProvider>
  );
}
