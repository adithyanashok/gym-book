import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import addMemberStyle from "../styles/add-member.styles";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import { selectedPlans } from "@/store/slices/plansSlice";

interface MembershipPlanProps {
  formData: {
    planId: number;
    startDate: Date;
  };
  handleInputChange: (field: string, value: string | number) => void;
  handleDateChange: (event: any, selectedDate: any) => void;
}

const MembershipPlan = ({
  formData,
  handleDateChange,
  handleInputChange,
}: MembershipPlanProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const plans = useSelector(selectedPlans);

  const getPlanPrice = () => {
    return plans.find((plan) => plan.id === formData.planId)?.amount || 0;
  };

  const calculateEndDate = () => {
    const startDate = new Date(formData.startDate);
    let endDate = new Date(startDate);

    const duration =
      plans.find((plan) => {
        return plan.id === formData.planId;
      })?.duration ?? 1;

    endDate.setMonth(endDate.getMonth() + Number(duration));

    return endDate.toDateString();
  };

  return (
    <View style={addMemberStyle.section}>
      <Text style={addMemberStyle.sectionTitle}>Membership Plan</Text>

      <View style={addMemberStyle.inputContainer}>
        <Text style={addMemberStyle.label}>Select Plan *</Text>
        <View style={addMemberStyle.pickerContainer}>
          <Picker
            selectedValue={formData.planId}
            onValueChange={(value) => handleInputChange("planId", value)}
            style={addMemberStyle.picker}
          >
            {plans.map((plan) => (
              <Picker.Item
                key={plan.id}
                label={`${plan.name} - $${plan.amount}`}
                value={plan.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={addMemberStyle.inputContainer}>
        <Text style={addMemberStyle.label}>Start Date *</Text>
        <TouchableOpacity
          style={addMemberStyle.dateButton}
          onPress={() => {
            return setShowDatePicker(true);
          }}
        >
          <Text style={addMemberStyle.dateText}>
            {formData.startDate.toDateString()}
          </Text>
          <MaterialCommunityIcons name="calendar" size={20} color="#6B7280" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePickerAndroid
            value={formData.startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              handleDateChange(event, selectedDate);

              if (event.type === "dismissed") {
                setShowDatePicker(false);
              }

              if (event.type === "set" && selectedDate) {
                setShowDatePicker(false);
              }
            }}
          />
        )}
      </View>

      <View style={addMemberStyle.infoBox}>
        <Text style={addMemberStyle.infoText}>
          <Text style={addMemberStyle.infoLabel}>Plan End Date: </Text>
          {`${calculateEndDate()}`}
        </Text>
        <Text style={addMemberStyle.infoText}>
          <Text style={addMemberStyle.infoLabel}>Total Amount: </Text>
          {`$${getPlanPrice()}`}
        </Text>
      </View>
    </View>
  );
};

export default MembershipPlan;
