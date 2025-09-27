import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import { PlanData } from "@/types/plan.type";
interface Props {
  plans: PlanData[];
  onPlanClick: (plan: PlanData) => void;
  onSubmit: () => void;
}
const PlansDetails = ({ onPlanClick, onSubmit, plans }: Props) => {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.containerHeading}>Plans</Text>
      <View>
        <View>
          {plans.map((plan) => (
            <TouchableOpacity
              onPress={() => onPlanClick(plan)}
              key={plan.id}
              style={[styles.planOption, styles.planOptionSelected]}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View>
                  <Text style={styles.planPrice}>₹{plan.amount}</Text>
                  <Text style={styles.planDuration}>{plan.duration} Month</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <PrimaryButton
            notFilled={true}
            onClick={() => onSubmit()}
            text="+ Add plan"
          />
        </View>
      </View>
    </View>
  );
};

export default PlansDetails;

const styles = StyleSheet.create({
  detailsContainer: {
    elevation: 2,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  containerHeading: { fontWeight: "bold", fontSize: 20, marginVertical: 10 },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 8,
  },
  planOption: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 12,
  },

  planName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
  },

  planPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  planDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planDuration: {
    fontSize: 14,
    color: "#ffffff",
  },
  planOptionSelected: {
    borderColor: "#4264FB",
    backgroundColor: "#4264FB",
  },
});
