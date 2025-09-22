import React from "react";
import { View, Text, StyleSheet } from "react-native";
type Props = {
  value: string | number;
  label: string | number;
  backgroundColor: string;
  iconComponent: any;
};
const SummaryCard = ({
  value,
  label,
  backgroundColor = "#4264FB",
  iconComponent,
}: Props) => {
  return (
    <View style={[styles.summaryCard, { backgroundColor }]}>
      <View style={styles.summaryIcon}>{iconComponent}</View>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  timeRangeSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginRight: 4,
  },
  summaryContainer: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
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
  growthBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  growthText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 200,
  },
  chartBarContainer: {
    alignItems: "center",
    flex: 1,
  },
  chartBarBackground: {
    height: "70%",
    width: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  chartBar: {
    width: 16,
    borderRadius: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
  },
  chartValue: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
  },
  distributionContainer: {
    marginTop: 8,
  },
  distributionItem: {
    marginBottom: 16,
  },
  distributionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  distributionName: {
    fontSize: 14,
    color: "#4B5563",
    marginRight: "auto",
  },
  distributionPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  attendanceTrend: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendanceText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  attendanceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  attendanceMetric: {
    alignItems: "center",
  },
  attendanceValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  attendanceLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  attendanceProgress: {
    marginBottom: 8,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  progressLabel: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  activityList: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
});

export default SummaryCard;
