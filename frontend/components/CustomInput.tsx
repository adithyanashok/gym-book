import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { AppColor } from "@/constants/colors";
interface Props {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
}
const CustomInput = ({ label, icon, onChange, placeholder }: Props) => {
  const [value, setValue] = useState<string>();
  return (
    <View>
      <Text style={{ color: AppColor.grey }}>{label}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderRadius: 8,
          height: 50,
          marginTop: 3,
          outlineColor: AppColor.grey,
          outlineWidth: 0.2,
          paddingLeft: 10,
        }}
      >
        {icon}
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={AppColor.grey}
          style={{
            fontSize: 16,
            width: "100%",
          }}
          onChangeText={(val) => {
            setValue(val);
            onChange(val);
          }}
        />
      </View>
    </View>
  );
};

export default CustomInput;
