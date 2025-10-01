import React, { useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AppColor } from "@/constants/colors";
import DateTimePicker from "react-native-ui-datepicker";
type Props = {
  visible: boolean;
  onClose: () => void;
  onChange: (selected: Date, selectedEnd: Date) => void;
};
export default function DateRangeModal({ visible, onClose, onChange }: Props) {
  const [selected, setSelected] = useState<Date>();
  const [selectedEnd, setSelectedEnd] = useState<Date>();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Select Date Range</Text>

          {/* Date Picker */}
          <DateTimePicker
            mode="range"
            onChange={({ startDate, endDate }) => {
              onChange(
                startDate ? (startDate as Date) : new Date(),
                endDate ? (endDate as Date) : new Date()
              );
              setSelected(startDate ? (startDate as Date) : new Date());
              setSelectedEnd(endDate ? (endDate as Date) : new Date());
            }}
            minDate={new Date()}
            startDate={selected}
            endDate={selectedEnd}
            styles={{
              selected: {
                backgroundColor: AppColor.primary,
                color: "white",
                borderRadius: 50,
                width: 45,
                height: 45,
              },
              selected_label: { color: "white", fontWeight: "600" },
              range_fill: { backgroundColor: AppColor.primaryWithOpacity },
              day_label: { fontSize: 14 },
            }}
          />

          {/* Action Button */}
          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)", // dimmed background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  closeText: {
    fontSize: 20,
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    color: AppColor.primary,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: AppColor.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
