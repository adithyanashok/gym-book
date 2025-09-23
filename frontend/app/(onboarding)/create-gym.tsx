import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import SafeScreen from "@/components/SafeArea";
import { AppColor } from "@/constants/colors";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import CustomInput from "@/components/CustomInput";
import PlanInput from "./components/PlanInput";
import addMemberStyle from "../(member)/styles/add-member.styles";
import { router } from "expo-router";
import { useToast } from "@/hooks/useToasts";

interface PlanDetail {
  duration: string;
  name: string;
}

const CreateGym = () => {
  const toast = useToast();
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [planDetails, setPlanDetails] = useState<PlanDetail[]>([]);
  const [gymDetails, setGymDetails] = useState({
    name: "",
    phone: "",
    email: "",
    gymName: "",
  });

  // Generate unique ID for each plan
  const generatePlanId = () => {
    return planIds.length > 0 ? Math.max(...planIds) + 1 : 1;
  };

  const handleAddPlan = () => {
    const newPlanId = generatePlanId();
    setPlanIds((prev) => [...prev, newPlanId]);
    // Add empty plan detail for the new plan
    setPlanDetails((prev) => [...prev, { duration: "", name: "" }]);
  };

  const handlePlanDetailChange = (
    planId: number,
    field: keyof PlanDetail,
    value: string
  ) => {
    setPlanDetails((prev) => {
      const planIndex = planIds.indexOf(planId);
      if (planIndex === -1) return prev;

      const updatedDetails = [...prev];
      updatedDetails[planIndex] = {
        ...updatedDetails[planIndex],
        [field]: value,
      };
      return updatedDetails;
    });
  };

  const handleDeletePlan = (planId: number) => {
    setPlanIds((prev) => prev.filter((id) => id !== planId));
    setPlanDetails((prev) => {
      const planIndex = planIds.indexOf(planId);
      if (planIndex === -1) return prev;

      const updatedDetails = [...prev];
      updatedDetails.splice(planIndex, 1);
      return updatedDetails;
    });
  };

  const handleGymDetailChange = (
    field: keyof typeof gymDetails,
    value: string
  ) => {
    setGymDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Gym Details:", gymDetails);
    console.log("Plan Details:", planDetails);

    // Filter out empty plans
    const validPlans = planDetails.filter(
      (plan) => plan.name.trim() && plan.duration.trim()
    );

    console.log("Valid Plans:", validPlans);
    if (
      !gymDetails.name ||
      !gymDetails.email ||
      !gymDetails.phone ||
      !gymDetails.gymName
    ) {
      toast.error("Please provide all data");
      return;
    }

    if (validPlans.length === 0) {
      toast.error("Please add at least one valid plan");
      return;
    }

    router.push("/(auth)/otp");
    // Submit logic here
  };

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View>
          <Text style={styles.headingText}>Create your gym</Text>

          {/* Your Details Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Your Details</Text>

            <CustomInput
              label="Your Name"
              placeholder="John"
              onChange={(value) => handleGymDetailChange("name", value)}
              icon={<Ionicons name="person" size={22} color={AppColor.grey} />}
            />

            <CustomInput
              label="Your Phone"
              placeholder="+91 984535XXXX"
              onChange={(value) => handleGymDetailChange("phone", value)}
              icon={<Feather name="phone" size={22} color={AppColor.grey} />}
            />

            <CustomInput
              label="Your Email"
              placeholder="john.doe@gmail.com"
              onChange={(value) => handleGymDetailChange("email", value)}
              icon={<Feather name="mail" size={22} color={AppColor.grey} />}
            />
          </View>

          {/* Gym Details Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Gym Details</Text>

            <CustomInput
              label="Gym Name"
              placeholder="Fit Hub"
              onChange={(value) => handleGymDetailChange("gymName", value)}
              icon={
                <FontAwesome
                  name="building-o"
                  size={22}
                  color={AppColor.grey}
                />
              }
            />

            <Text style={styles.sectionHeader}>Plan Details</Text>

            {planIds.map((planId, index) => (
              <PlanInput
                key={planId}
                label={`Plan ${index + 1}`}
                placeholder="Monthly"
                onNameChange={(value) =>
                  handlePlanDetailChange(planId, "name", value)
                }
                onDurationChange={(value) =>
                  handlePlanDetailChange(planId, "duration", value)
                }
                onDelete={() => handleDeletePlan(planId)}
              />
            ))}

            <TouchableOpacity
              style={[styles.addPlanbutton]}
              onPress={handleAddPlan}
            >
              <Text
                style={[
                  addMemberStyle.submitButtonText,
                  { fontWeight: "400", fontSize: 14, color: AppColor.primary },
                ]}
              >
                + Add Plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[addMemberStyle.submitButton, { margin: 12 }]}
          onPress={handleSubmit}
        >
          <Text style={addMemberStyle.submitButtonText}>Create Gym</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
};

export default CreateGym;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 12,
    color: AppColor.primary,
  },
  sectionContainer: {
    padding: 14,
    gap: 12,
    backgroundColor: "#ffffff",
    elevation: 1,
    margin: 12,
    borderRadius: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "500",
  },
  addPlanbutton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    height: 36,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
});
