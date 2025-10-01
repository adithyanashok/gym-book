import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";

import RenewMemberShipHeader from "./components/RenewMemberShipHeader";
import DatePicker from "./components/RenewMembershipDatePicker";
import OrderSummary from "./components/OrderSummary";
import ActionButtons from "./components/RenewMembershipActionButton";
import { useDispatch, useSelector } from "react-redux";
import { selectedPlans } from "@/store/slices/plansSlice";
import { AppDispatch } from "@/store/store";
import { renewMemberPlan } from "@/store/slices/membersSlice";
import { useToast } from "@/hooks/useToasts";
import { PlanData } from "@/types/plan.type";

interface RenewMembershipProps {
  member: { id: number; name: string };
  onClose: () => void;
  onRenew: (renewalData: any) => void;
}

export default function RenewMembership({
  member,
  onClose,
  onRenew,
}: RenewMembershipProps) {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const plans = useSelector(selectedPlans);
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
  const [startDate, setStartDate] = useState(new Date());

  const handleRenew = async () => {
    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan) return;

    const renewalData = {
      memberId: member.id,
      planId: plan.id,
      startDate: startDate,
    };
    console.log(renewalData);
    try {
      const data = await dispatch(renewMemberPlan(renewalData)).unwrap();
      toast.success(data.message);
      onRenew?.(renewalData);
      onClose?.();
    } catch (error) {
      toast.error(error);
    }
  };

  const calculateEndDate = () => {
    const endDate = new Date(startDate);

    switch (selectedPlan) {
      case 1:
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case 2:
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case 3:
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }

    return endDate.toDateString();
  };

  const getPlanPrice = () => {
    return plans.find((plan) => plan.id === selectedPlan)?.amount || 0;
  };

  const renderPlanOption = (plan: PlanData) => (
    <TouchableOpacity
      key={plan.id}
      style={[
        styles.planOption,
        selectedPlan === plan.id && styles.planOptionSelected,
      ]}
      onPress={() => setSelectedPlan(plan.id)}
    >
      <View style={styles.planHeader}>
        <View style={styles.planRadio}>
          <View
            style={[
              styles.radioInner,
              selectedPlan === plan.id && styles.radioInnerSelected,
            ]}
          />
        </View>
        <Text style={styles.planName}>{plan.name}</Text>
        <View>
          <Text style={styles.planPrice}>₹{plan.amount}</Text>
          <Text style={styles.planDuration}>{plan.duration} Month</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <RenewMemberShipHeader name={member.name} onClose={onClose} />

      <ScrollView style={styles.content}>
        {/* Plan Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Plan</Text>
          {plans.map(renderPlanOption)}
        </View>

        {/* Date Selection */}
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
        />

        {/* Summary */}
        <OrderSummary
          planOptions={plans}
          selectedPlan={selectedPlan}
          startDate={startDate}
          endDate={calculateEndDate()}
          totalAmount={getPlanPrice()}
        />
      </ScrollView>

      {/* Action Buttons */}
      <ActionButtons
        onCancel={onClose}
        onConfirm={handleRenew}
        amount={getPlanPrice()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  planOption: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  planOptionSelected: {
    borderColor: "#4264FB",
    backgroundColor: "#F0F7FF",
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  planRadio: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  radioInnerSelected: {
    backgroundColor: "#4264FB",
  },
  planName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },

  planPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  planDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planDuration: {
    fontSize: 14,
    color: "#6B7280",
  },
});
