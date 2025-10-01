import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AppColor } from "@/constants/colors";
interface Props {
  onClick: () => void;
  text: string;
  notFilled: boolean | null;
}
const PrimaryButton = ({ onClick, text, notFilled }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, notFilled && styles.notFilledButton]}
      onPress={onClick}
    >
      <Text style={[styles.text, notFilled && styles.filedText]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColor.primary,
    borderRadius: 12,
    height: 40,
    marginBottom: 12,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  notFilledButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: AppColor.primary,
    elevation: 0,
  },
  text: {
    fontWeight: "400",
    color: "#ffffff",
  },
  filedText: {
    fontWeight: "500",
    color: AppColor.primary,
  },
});
