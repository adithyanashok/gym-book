import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PlanOption {
  id: number;
  name: string;
  amount: number;
}

interface OrderSummaryProps {
  planOptions: PlanOption[];
  selectedPlan: number;
  startDate: Date;
  endDate: string;
  totalAmount: number;
  currencySymbol?: string;
  title?: string;
  containerStyle?: object;
  titleStyle?: object;
  rowStyle?: object;
  labelStyle?: object;
  valueStyle?: object;
  totalRowStyle?: object;
  totalLabelStyle?: object;
  totalAmountStyle?: object;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  planOptions,
  selectedPlan,
  startDate,
  endDate,
  totalAmount,
  currencySymbol = "₹",
  title = "Order Summary",
  containerStyle,
  titleStyle,
  rowStyle,
  labelStyle,
  valueStyle,
  totalRowStyle,
  totalLabelStyle,
  totalAmountStyle,
}) => {
  const selectedPlanData = planOptions.find((p) => p.id === selectedPlan);

  return (
    <View style={[styles.summarySection, containerStyle]}>
      <Text style={[styles.summaryTitle, titleStyle]}>{title}</Text>

      <View style={[styles.summaryRow, rowStyle]}>
        <Text style={[styles.summaryLabel, labelStyle]}>Plan</Text>
        <Text style={[styles.summaryValue, valueStyle]}>
          {selectedPlanData?.name || "N/A"}
        </Text>
      </View>

      <View style={[styles.summaryRow, rowStyle]}>
        <Text style={[styles.summaryLabel, labelStyle]}>Start Date</Text>
        <Text style={[styles.summaryValue, valueStyle]}>
          {startDate.toDateString()}
        </Text>
      </View>

      <View style={[styles.summaryRow, rowStyle]}>
        <Text style={[styles.summaryLabel, labelStyle]}>End Date</Text>
        <Text style={[styles.summaryValue, valueStyle]}>{endDate}</Text>
      </View>

      <View style={[styles.summaryRow, styles.totalRow, totalRowStyle]}>
        <Text style={[styles.totalLabel, totalLabelStyle]}>Total Amount</Text>
        <Text style={[styles.totalAmount, totalAmountStyle]}>
          {currencySymbol}
          {totalAmount.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summarySection: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4264FB",
  },
});

export default OrderSummary;
