import { Stack } from "expo-router";
export default function MemberLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="payments-history"
        options={{ headerShown: true, title: "Payment History" }}
      />
      <Stack.Screen name="member-details" options={{ headerShown: false }} />
    </Stack>
  );
}
