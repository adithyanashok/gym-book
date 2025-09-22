import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
type Props = {
  name: string;
  onClose: () => void;
};
const RenewMemberShipHeader = ({ name, onClose }: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Renew Membership</Text>
      <Text style={styles.subtitle}>for {name}</Text>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
};

export default RenewMemberShipHeader;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
