import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  adminLogin,
  selectAdmin,
  selectAdminError,
  selectLoginResponse,
} from "@/store/slices/adminSlice";
import { useToast } from "@/hooks/useToasts";
import { AppColor } from "@/constants/colors";
import { ScreenName } from "@/types/screen-name.type";
import { gymLogin, gymSignup } from "@/store/slices/gymSlice";

export default function LoginScreen() {
  const screen = useLocalSearchParams<{ screenName: ScreenName }>();
  const dispatch = useDispatch<AppDispatch>();
  const [screenName, setScreenName] = useState<ScreenName>(screen.screenName);

  // STATES
  const [phone, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<null | string>(null);

  const toast = useToast();

  const handleSendOTP = async () => {
    if (!phone) {
      setValidationError("Please enter your phone number");
      return;
    }

    if (phone.length !== 10) {
      setValidationError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);

    // Simulate API call to send OTP
    try {
      if (screenName === ScreenName.SIGNUP) {
        console.log(phone);
        const result = await dispatch(gymSignup(phone)).unwrap();
        console.log("SIGNUP RESULT ", result);
        router.replace({
          pathname: "/otp",
          params: {
            phoneNumber: phone,
            gymId: result.data.gymId,
          },
        });
      } else {
        console.log(phone);
        const result = await dispatch(gymLogin(phone)).unwrap();
        console.log("LOGIN RESULT ", result);
        router.replace({
          pathname: "/otp",
          params: {
            phoneNumber: phone,
            gymId: result.data.gymId,
          },
        });
      }
      // await dispatch(adminLogin({ phone: phoneNumber }));

      // router.push({
      //   pathname: "/(auth)/otp",
      // });
    } catch (error: any) {
      toast.error(error ?? "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {screenName === ScreenName.LOGIN
              ? "Welcome Back"
              : "Create an account"}
          </Text>
          <Text style={styles.subtitle}>
            Enter your phone number to continue
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, validationError && { borderColor: "red" }]}
              placeholder="Enter your phone number"
              placeholderTextColor={validationError ? "red" : "#9CA3AF"}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhoneNumber}
              maxLength={10}
            />
            <Text style={styles.validationError}>{validationError}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSendOTP}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Sending OTP..." : "Continue"}
            </Text>
          </TouchableOpacity>
          <Text
            onPress={() =>
              setScreenName(
                screenName === "login" ? ScreenName.SIGNUP : ScreenName.LOGIN
              )
            }
            style={[styles.subtitle, styles.linkText]}
          >
            {screenName === ScreenName.LOGIN
              ? "Don't have an account"
              : "Already have an account"}
            ?{" "}
            <Text style={styles.screenName}>
              {screenName === ScreenName.LOGIN ? "SignUp" : "SignIn"}
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "400",
    color: "#111827",
    marginBottom: 8,
    // textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    // textAlign: "center",
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
  },

  validationError: { color: "red", marginLeft: 5, marginTop: 2 },
  button: {
    backgroundColor: "#4264FB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  termsText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: { marginVertical: 10, textAlign: "center" },
  screenName: { color: AppColor.primary, fontWeight: "bold" },
});
