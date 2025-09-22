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
            backgroundColor: "red",
            padding: 10,
            marginTop: 50,
            marginHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "500",
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
