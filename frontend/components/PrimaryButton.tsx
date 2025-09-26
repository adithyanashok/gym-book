import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import addMemberStyle from "@/app/(member)/styles/add-member.styles";
import { AppColor } from "@/constants/colors";
interface Props {
  onClick: () => void;
  text: string;
}
const PrimaryButton = ({ onClick, text }: Props) => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  text: {
    fontWeight: "400",
    color: "#ffffff",
  },
});
