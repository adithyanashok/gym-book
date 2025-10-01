import { AppColor } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

interface MonthPickerProps {
  selectedMonth: string | null;
  onMonthSelect: (month: string) => void;
  currentYear?: number;
}

const MonthPicker: React.FC<MonthPickerProps> = ({
  selectedMonth,
  onMonthSelect,
  currentYear = new Date().getFullYear(),
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const months = [
    { id: 1, name: "January", value: "01" },
    { id: 2, name: "February", value: "02" },
    { id: 3, name: "March", value: "03" },
    { id: 4, name: "April", value: "04" },
    { id: 5, name: "May", value: "05" },
    { id: 6, name: "June", value: "06" },
    { id: 7, name: "July", value: "07" },
    { id: 8, name: "August", value: "08" },
    { id: 9, name: "September", value: "09" },
    { id: 10, name: "October", value: "10" },
    { id: 11, name: "November", value: "11" },
    { id: 12, name: "December", value: "12" },
  ];

  const formatMonthDisplay = (monthString: string | null): string => {
    if (!monthString) return "Select Month";

    const monthNumber = parseInt(monthString.split("-")[1]);
    const monthName = months.find((m) => m.id === monthNumber)?.name;
    return monthName || "Select Month";
  };

  const handleMonthSelect = (monthValue: string) => {
    const selectedDate = `${currentYear}-${monthValue}-01`;
    onMonthSelect(selectedDate);
    setModalVisible(false);
  };

  const getCurrentMonthDisplay = () => {
    if (selectedMonth) {
      return formatMonthDisplay(selectedMonth);
    }
    return formatMonthDisplay(
      `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, "0")}-01`
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.timeRangeSelector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.timeRangeText}>{getCurrentMonthDisplay()}</Text>
        <Ionicons name="chevron-down" size={16} color="#6B7280" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month</Text>

            <FlatList
              data={months}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.monthItem,
                    selectedMonth?.endsWith(`-${item.value}-01`) &&
                      styles.selectedMonthItem,
                  ]}
                  onPress={() => handleMonthSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.monthText,
                      selectedMonth?.endsWith(`-${item.value}-01`) &&
                        styles.selectedMonthText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  timeRangeSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    color: "#374151",
  },
  monthItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  selectedMonthItem: {
    backgroundColor: "#3B82F6",
    borderRadius: 6,
  },
  monthText: {
    fontSize: 16,
    color: "#374151",
  },
  selectedMonthText: {
    color: "white",
    fontWeight: "500",
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: AppColor.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default MonthPicker;
