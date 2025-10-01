import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const NoData = ({ emptyText }: { emptyText: string }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stateContainer}>
        <Ionicons name="search" size={48} color="#6B7280" />
        <Text style={styles.stateText}>{emptyText}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  stateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  stateText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 16,
  },
});

export default NoData;
