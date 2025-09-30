import { useEffect } from "react";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { STORAGE } from "@/utils/storage";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await STORAGE.getData("accessToken");
        const refresh = await STORAGE.getData("refreshToken");
        console.log(token);
        if (!token) {
          router.replace("/(onboarding)");
          return;
        }

        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp > now) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(onboarding)");
        }
      } catch {
        router.replace("/(onboarding)");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
