import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Loading = ({ loadingText }: { loadingText: string }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stateContainer}>
        <ActivityIndicator size="large" color="#4264FB" />
        <Text style={styles.stateText}>{loadingText}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
