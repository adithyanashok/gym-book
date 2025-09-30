import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CurrentPlanBanner = ({
  currentPlan,
}: {
  currentPlan: string | undefined;
}) => {
  return (
    <View style={styles.currentPlanBanner}>
      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
      <Text style={styles.currentPlanText}>
        Current plan: <Text style={styles.currentPlanName}>{currentPlan}</Text>
      </Text>
    </View>
  );
};

export default CurrentPlanBanner;

const styles = StyleSheet.create({
  currentPlanBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    margin: 20,
    marginTop: 0,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  currentPlanText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#2E7D32",
  },
  currentPlanName: {
    fontWeight: "bold",
  },
});
