import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
type Props = {
  member: any;
};
const PaymentHistory = ({ member }: Props) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment History</Text>

      {member.paymentHistory.map((payment, index) => (
        <View key={index} style={styles.paymentItem}>
          <View>
            <Text style={styles.paymentDate}>
              {new Date(payment.date).toLocaleDateString()}
            </Text>
            <Text
              style={[
                styles.paymentStatus,
                payment.status === "paid"
                  ? styles.paidStatus
                  : styles.pendingStatus,
              ]}
            >
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </Text>
          </View>
          <Text style={styles.paymentAmount}>₹{payment.amount}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllButtonText}>View All Payments</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  renewButton: {
    backgroundColor: "#4264FB",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },
  renewButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  paymentDate: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 4,
  },
  paymentStatus: {
    fontSize: 14,
    fontWeight: "500",
  },
  paidStatus: {
    color: "#10B981",
  },
  pendingStatus: {
    color: "#EF4444",
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  viewAllButton: {
    borderWidth: 1,
    borderColor: "#4264FB",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 12,
  },
  viewAllButtonText: {
    color: "#4264FB",
    fontSize: 16,
    fontWeight: "600",
  },
});
