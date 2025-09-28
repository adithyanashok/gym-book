import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useToast } from "@/hooks/useToasts";
import { logout } from "@/store/slices/gymSlice";

const LogoutButton = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.replace("/(auth)");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => handleLogout()}>
        <View
          style={{
            backgroundColor: "red",
            padding: 10,

            borderRadius: 10,
            borderColor: "red",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: "white",
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
