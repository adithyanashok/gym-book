import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create-gym" />
    </Stack>
  );
};

export default OnboardingLayout;
