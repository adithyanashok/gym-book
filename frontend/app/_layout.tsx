import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { store } from "../store/store";
import { Stack, useRouter } from "expo-router";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { STORAGE } from "@/utils/storage";
import { StyleSheet, Text, View } from "react-native";
import SafeScreen from "@/components/SafeArea";
import { AppColor } from "@/constants/colors";

export default function RootLayout() {
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const accessToken = await STORAGE.getData("accessToken");

      try {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(onboarding)");
        }
      } catch (error) {
        router.replace("/(onboarding)");
      }
    };
    checkUser();
  }, [router]);
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <Stack>
          <Stack.Screen
            name="(onboarding)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              header(props) {
                return (
                  <View style={styles.header}>
                    <Text style={styles.heading}>GymMaster</Text>
                  </View>
                );
              },
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(member)" options={{ headerShown: false }} />
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
