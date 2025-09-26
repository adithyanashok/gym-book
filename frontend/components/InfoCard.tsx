import { View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface Props {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
  valueStyle?: StyleProp<TextStyle>;
}
const InfoCard = (props: Props) => {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>{props.icon}</View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{props.label}</Text>
        <Text style={[styles.infoValue, props.valueStyle]}>{props.value}</Text>
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#111827",
  },
});
