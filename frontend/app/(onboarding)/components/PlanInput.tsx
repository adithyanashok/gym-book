import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { AppColor } from "@/constants/colors";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

interface Props {
  label: string;
  name?: string;
  duration?: string;
  amount?: string;
  placeholder: string;
  onNameChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onAmountChange: (value: number) => void;
  onDelete: () => void;
  showDeleteIcon: boolean;
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

const PlanInput = ({
  label,
  onNameChange,
  placeholder,
  onDelete,
  onDurationChange,
  onAmountChange,
  showDeleteIcon,
  name,
  amount,
  duration,
}: Props) => {
  console.log(amount);
  console.log(duration);
  console.log(name);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={[styles.inputBox, !showDeleteIcon && { width: "100%" }]}>
          <MaterialIcons
            name="card-membership"
            size={22}
            color={AppColor.grey}
          />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={AppColor.grey}
            defaultValue={name}
            style={{
              fontSize: 16,
              width: "100%",
            }}
            onChangeText={onNameChange}
          />
        </View>
        {showDeleteIcon && (
          <MaterialIcons
            onPress={() => onDelete()}
            name="delete-outline"
            size={24}
            color={AppColor.grey}
          />
        )}
      </View>
      <View style={[styles.inputBox, !showDeleteIcon && { width: "100%" }]}>
        <FontAwesome6 name="money-check" size={22} color={AppColor.grey} />
        <TextInput
          placeholder={"1000"}
          placeholderTextColor={AppColor.grey}
          style={{
            fontSize: 16,
            width: "100%",
          }}
          defaultValue={amount?.toString()}
          onChangeText={(value) => onAmountChange(parseInt(value))}
        />
      </View>

      <View style={styles.dropdownBox}>
        <RNPickerSelect
          placeholder={{ label: "Duration", color: AppColor.grey }}
          style={{ placeholder: { color: AppColor.grey } }}
          value={duration}
          onValueChange={onDurationChange}
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
    width: "90%",
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
