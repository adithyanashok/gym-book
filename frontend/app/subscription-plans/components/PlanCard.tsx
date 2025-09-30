import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SubscriptionPlan } from "@/types/subsctiption.type";
import { Gym } from "@/types/gym.type";
import { AppColor } from "@/constants/colors";
type Props = {
  plan: SubscriptionPlan;
  gym: Gym | null;
  handleSubscribe: (planId: number) => Promise<void>;
};
const PlanCard = ({ plan, gym, handleSubscribe }: Props) => {
  const getPlansText = (plans: number): string => {
    return plans === -1 ? "Unlimited plans" : `${plans} workout plans`;
  };
  const isCurrentPlan = plan.id === gym?.subscriptionPlan.id;
  const isSelected = gym?.subscriptionPlan.id === plan.id;
  return (
    <View key={plan.id} style={[styles.planCard, styles.popularPlanCard]}>
      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <View style={styles.currentBadge}>
          <Text style={styles.currentBadgeText}>CURRENT PLAN</Text>
        </View>
      )}

      {/* Plan Header */}
      <View style={styles.planHeader}>
        <Text style={styles.planName}>{plan.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.planPrice}>
            {plan.price <= 0 ? "Free" : `${plan.price}/${plan.billingCycle}`}
          </Text>
        </View>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Ionicons name="people" size={20} color="#007AFF" />
          <Text style={styles.metricText}>
            {`Up to ${plan.maxMembers} members`}
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Ionicons name="fitness" size={20} color="#007AFF" />
          <Text style={styles.metricText}>
            {getPlansText(plan.workoutPlans)}
          </Text>
        </View>
      </View>

      {/* Subscribe Button */}
      {!isCurrentPlan && (
        <TouchableOpacity
          style={[styles.subscribeButton]}
          onPress={() => handleSubscribe(plan.id)}
          disabled={isCurrentPlan || isSelected}
        >
          <Text style={[styles.subscribeButtonText]}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlanCard;

const styles = StyleSheet.create({
  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  popularPlanCard: {
    borderColor: "#007AFF",
    transform: [{ scale: 1.02 }],
  },

  currentBadge: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
    backgroundColor: AppColor.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  planHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  planName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
  },

  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  metricItem: {
    alignItems: "center",
    flex: 1,
  },
  metricText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1A1A1A",
    marginTop: 4,
    textAlign: "center",
  },

  subscribeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  subscribeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
