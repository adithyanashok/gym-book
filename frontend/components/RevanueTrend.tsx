import { selectedRevanue } from "@/store/slices/statisticsSlice";
import { RootState } from "@/store/store";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Error from "./Error";

const RevenueTrendChart = () => {
  const revanues = useSelector(selectedRevanue);

  const error = useSelector((state: RootState) => state.statistics.error);

  if (error) {
    return <Error error="Error" errorText="Something went wrong..." />;
  }

  return (
    <View style={styles.chartContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Revenue Trend</Text>
      </View>
      {revanues.monthlyRevenues.length === 0 ? (
        <Text style={{ textAlign: "center" }}>No data</Text>
      ) : (
        <View style={styles.horizontalChart}>
          {revanues.monthlyRevenues.map((item, index) => (
            <View key={index} style={styles.horizontalBarContainer}>
              <View style={styles.barInfo}>
                <Text style={styles.chartLabel}>
                  {item.month.length > 7
                    ? `${item.month.substring(0, 3)} '${item.month.substring(
                        item.month.length - 2
                      )}`
                    : item.month}
                </Text>
                <Text style={styles.chartValue}>
                  ₹{item.revanue.toFixed(0)}
                </Text>
              </View>

              <View style={styles.horizontalBarBackground}>
                <View
                  style={[
                    styles.horizontalBar,
                    {
                      width: `${(item.revanue / revanues.totalRevanue) * 100}%`,
                      backgroundColor: "#4264FB",
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default RevenueTrendChart;

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  horizontalChart: {
    gap: 12,
  },
  horizontalBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  barInfo: {
    width: 80,
    alignItems: "flex-start",
  },
  chartLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  chartValue: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "600",
    marginTop: 2,
  },
  horizontalBarBackground: {
    flex: 1,
    height: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    overflow: "hidden",
  },
  horizontalBar: {
    height: "100%",
    borderRadius: 8,
    minWidth: 8, // Minimum width for very small values
  },
});

// Remove unused styles from your original code
