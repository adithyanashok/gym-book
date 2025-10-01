import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AppColor } from "@/constants/colors";
import {
  selectMember,
  selectPaymentHistory,
} from "@/store/slices/membersSlice";
import { useSelector } from "react-redux";

const PaymentsHistory = () => {
  const payment = useSelector(selectPaymentHistory);
  const member = useSelector(selectMember);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payments - {member?.name}</Text>

      {payment.map((payment, index) => (
        <View key={payment.id} style={styles.paymentItem}>
          <View>
            <Text style={styles.paymentDate}>
              {new Date(payment.date).toLocaleDateString()}
            </Text>
            <Text style={[styles.paymentStatus, styles.paidStatus]}>
              {payment.plan}
            </Text>
          </View>
          <Text style={styles.paymentAmount}>₹{payment.amount}</Text>
        </View>
      ))}
    </View>
  );
};

export default PaymentsHistory;

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 8,
    marginBottom: 16,
    marginTop: 16,
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
    color: AppColor.primary,
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
