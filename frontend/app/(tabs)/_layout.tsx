import { AppColor } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import { Text } from "react-native";
export default function TabLayout() {
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

          // title: "Fit Hub",
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
        name="my-gym"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Fit Hub",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
