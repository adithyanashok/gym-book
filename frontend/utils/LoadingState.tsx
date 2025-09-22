import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LoadingStateProps {
  status: "idle" | "pending" | "succeeded" | "failed";
  error?: string | null;
  data: any;
  onRetry?: () => void;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  status,
  error,
  data,
  onRetry,
  loadingText = "Loading...",
  errorText = "Error",
  emptyText = "No data found",
}) => {
  // Show loader while loading
  if (status === "pending") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color="#4264FB" />
          <Text style={styles.stateText}>{loadingText}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error if request failed
  if (status === "failed" && error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.stateContainer}>
          <Ionicons name="alert-circle" size={48} color="#EF4444" />
          <Text style={[styles.stateText, styles.errorText]}>
            {errorText}: {error}
          </Text>
          {onRetry && (
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
              <Ionicons name="refresh" size={20} color="#FFFFFF" />
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // Show message if no data found
  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.stateContainer}>
          <Ionicons name="search" size={48} color="#6B7280" />
          <Text style={styles.stateText}>{emptyText}</Text>
        </View>
      </SafeAreaView>
    );
  }
};

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
  errorText: {
    color: "#EF4444",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4264FB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default LoadingState;
