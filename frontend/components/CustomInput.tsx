import { View, Text, TextInput } from "react-native";
import React from "react";
import { AppColor } from "@/constants/colors";
import { FontAwesome } from "@expo/vector-icons";
interface Props {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
}
const CustomInput = ({ label, icon, onChange, placeholder }: Props) => {
  return (
    <View>
      <Text style={{ color: AppColor.grey }}>{label}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderColor: AppColor.grey,
          borderWidth: 0.2,
          borderRadius: 8,
          outlineColor: AppColor.grey,
          outlineWidth: 0.2,
          height: 54,
          marginTop: 3,
          paddingLeft: 12,
        }}
      >
        {icon}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={AppColor.grey}
          style={{
            fontSize: 16,
          }}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
};

export default CustomInput;
