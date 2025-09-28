import React, { useState, useRef } from "react";
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
import { selectAdminLoading } from "@/store/slices/adminSlice";
import { useToast } from "@/hooks/useToasts";
import { gymLogin, verifyOtp } from "@/store/slices/gymSlice";

import * as Notification from "expo-notifications";
export default function OTPScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<TextInput[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const loading = useSelector(selectAdminLoading);

  const { phoneNumber, gymId } = useLocalSearchParams<{
    phoneNumber: string;
    gymId: string;
  }>();

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus to next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit when all digits are entered
    // if (index === 5 && text) {
    //   const fullOtp = newOtp.join("");
    //   if (fullOtp.length === 6) {
    //     handleVerifyOTP(fullOtp);
    //   }
    // }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (enteredOtp?: string) => {
    const otpCode = enteredOtp || otp.join("");

    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit OTP");
      return;
    }
    const token = (await Notification.getDevicePushTokenAsync()).data;
    console.log("FCM: ", token);
    try {
      const otp = parseInt(otpCode);
      const id = parseInt(gymId);
      const result = await dispatch(
        verifyOtp({ otp, gymId: id, fcm_token: token })
      ).unwrap();
      if (!result.data.isDetailComplete) {
        router.replace("/create-gym");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error) {
      toast.error(
        (error as string) ?? "Something went wrong. Please try again."
      );
    }
  };

  const handleResendOTP = async () => {
    setCountdown(60);
    try {
      await dispatch(gymLogin(phoneNumber)).unwrap();
      toast.success("OTP Sent, New OTP has been sent to your phone");
    } catch (error) {
      toast.error(
        (error as string) ?? "Something went wrong. Please try again."
      );
    }
  };

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          Weve sent a 6-digit code to {phoneNumber}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) {
                  inputRefs.current[index] = ref;
                }
              }}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            loading === "pending" && styles.buttonDisabled,
          ]}
          onPress={() => handleVerifyOTP()}
          disabled={loading === "pending"}
        >
          <Text style={styles.buttonText}>
            {loading === "pending" ? "Verifying..." : "Verify OTP"}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didnt receive the code? </Text>
          {countdown > 0 ? (
            <Text style={styles.countdownText}>Resend in {countdown}s</Text>
          ) : (
            <TouchableOpacity onPress={handleResendOTP}>
              <Text style={styles.resendLink}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Change phone number</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  otpInput: {
    width: 50,
    height: 60,
    // backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
  },
  button: {
    backgroundColor: "#4264FB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  resendText: {
    fontSize: 14,
    color: "#6B7280",
  },
  resendLink: {
    fontSize: 14,
    color: "#4264FB",
    fontWeight: "600",
  },
  countdownText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  backButton: {
    alignSelf: "center",
  },
  backText: {
    fontSize: 14,
    color: "#4264FB",
    fontWeight: "500",
  },
});
