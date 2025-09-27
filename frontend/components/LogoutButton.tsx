import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logout, selectLoadingAdminLoading } from "@/store/slices/adminSlice";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

const LogoutButton = () => {
  const router = useRouter();
  const status = useSelector(selectLoadingAdminLoading);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    await dispatch(logout());
    router.replace("/(auth)");
  };
  return (
    <View>
      <TouchableOpacity onPress={() => handleLogout()}>
        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 10,

            borderRadius: 10,
            borderColor: "red",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: "red",
              fontSize: 14,
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;
