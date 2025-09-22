import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AppColor } from "@/constants/colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
interface Props {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
  onDelete: () => void;
}

const durations = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
];
const PlanInput = ({ label, icon, onChange, placeholder, onDelete }: Props) => {
  const [planName, setPlanName] = useState("");
  const [planDuration, setPlanDuration] = useState("");
  const [planDetail, setPlanDetail] = useState({});

  const handle = (key, value) => {
    setPlanDetail({
      key,
      value,
    });
  };
  console.log(planDetail);
  return (
    <View>
      <Text style={{ color: AppColor.grey }}>Plan Details</Text>
      <View style={styles.inputBox}>
        {icon}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={AppColor.grey}
          style={{
            fontSize: 16,
          }}
          onChangeText={(value) => setPlanDetail({ ...planDetail, value })}
        />
      </View>

      <View style={styles.dropdownBox}>
        <RNPickerSelect
          placeholder={{ label: "Duration", color: AppColor.grey }}
          style={{ placeholder: { color: AppColor.grey } }}
          onValueChange={(value) => setPlanDetail({ ...planDetail, value })}
          items={durations.map((e) => ({
            label: `${e.label} Month`,
            value: e.value,
          }))}
        />
      </View>
    </View>
  );
};

export default PlanInput;

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: AppColor.grey,
    borderWidth: 0.2,
    borderRadius: 8,
    outlineColor: AppColor.grey,
    outlineWidth: 0.2,
    height: 54,
    marginTop: 10,
    paddingLeft: 12,
  },
  dropdownBox: {
    borderColor: AppColor.grey,
    borderWidth: 0.2,
    borderRadius: 8,
    outlineColor: AppColor.grey,
    outlineWidth: 0.2,
    height: 54,
    marginTop: 10,
    paddingLeft: 12,
  },
});
