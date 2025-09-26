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
import addMemberStyle from "../(member)/styles/add-member.styles";
import { router } from "expo-router";
import { useToast } from "@/hooks/useToasts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { GymData } from "@/types/gym.type";
import { PlanData } from "@/types/plan.type";
import PlanInput from "../(onboarding)/components/PlanInput";
import { addGymDetails } from "@/store/slices/gymSlice";
import PrimaryButton from "@/components/PrimaryButton";

const CreateGym = () => {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [planDetails, setPlanDetails] = useState<PlanData[]>([]);
  const [gymDetails, setGymDetails] = useState({
    name: "",
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
    setPlanDetails((prev) => [
      ...prev,
      { duration: "", name: "", amount: 0, id: 0 },
    ]);
  };

  const handlePlanDetailChange = (
    planId: number,
    field: keyof PlanData,
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

  const handleSubmit = async () => {
    const gymData: GymData = {
      gym_name: gymDetails.gymName,
      user_email: gymDetails.email,
      username: gymDetails.name,
      plans: planDetails,
    };

    // Filter out empty plans
    const validPlans = planDetails.filter(
      (plan) => plan.name.trim() && plan.duration.trim()
    );

    if (!gymDetails.name || !gymDetails.email || !gymDetails.gymName) {
      toast.error("Please provide all data");
      return;
    }

    if (validPlans.length === 0) {
      toast.error("Please add at least one valid plan");
      return;
    }
    try {
      const result = await dispatch(addGymDetails(gymData)).unwrap();
      console.log(result);

      toast.success(result.message);

      router.replace("/(tabs)");
    } catch (error) {
      toast.error(
        (error as string) ?? "Something went wrong. Please try again."
      );
    }

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
                onAmountChange={(value) =>
                  handlePlanDetailChange(planId, "amount", value)
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
        <PrimaryButton onClick={handleSubmit} text="+ Add plan" />
      </ScrollView>
    </SafeScreen>
  );
};

export default CreateGym;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 12,
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
