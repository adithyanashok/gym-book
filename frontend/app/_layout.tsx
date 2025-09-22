import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { store } from "../store/store";
import { Stack, useRouter } from "expo-router";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { STORAGE } from "@/utils/storage";

export default function RootLayout() {
  // const router = useRouter();
  // useEffect(() => {
  //   const checkUser = async () => {
  //     const accessToken = await STORAGE.getData("accessToken");

  //     try {
  //       const decodedToken = jwtDecode(accessToken);
  //       const currentTime = Date.now() / 1000;

  //       if (decodedToken.exp && decodedToken.exp > currentTime) {
  //         router.replace("/(tabs)");
  //       } else {
  //         router.replace("/(auth)");
  //       }
  //     } catch (error) {
  //       router.replace("/(auth)");
  //     }
  //   };
  //   checkUser();
  // }, [router]);
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(member)" />
        </Stack>
      </SnackbarProvider>
    </Provider>
  );
}
