import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  mode?: "date" | "time" | "datetime";
  display?: "default" | "spinner" | "calendar" | "clock";
  minimumDate?: Date;
  maximumDate?: Date;
  containerStyle?: object;
  buttonStyle?: object;
  textStyle?: object;
  iconColor?: string;
  chevronColor?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  mode = "date",
  display = "default",
  minimumDate,
  maximumDate,
  containerStyle,
  buttonStyle,
  textStyle,
  iconColor = "#4264FB",
  chevronColor = "#6B7280",
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.dateButton, buttonStyle]}
        onPress={() => setShowPicker(true)}
      >
        <MaterialCommunityIcons name="calendar" size={20} color={iconColor} />
        <Text style={[styles.dateText, textStyle]}>{value.toDateString()}</Text>
        <Ionicons name="chevron-down" size={16} color={chevronColor} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode={mode}
          display={display}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9FAFB",
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    marginLeft: 8,
    marginRight: 8,
  },
});

export default DatePicker;
