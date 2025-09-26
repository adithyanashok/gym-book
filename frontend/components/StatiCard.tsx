import { AppColor } from "@/constants/colors";
import {
  getOverview,
  getStatistics,
  selectedCurrentStatistics,
  selectedStatistics,
} from "@/store/slices/statisticsSlice";
import { AppDispatch } from "@/store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentMonthRange } from "../utils/dateUtils";

const StatiCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const statistics = useSelector(selectedCurrentStatistics);

  const { startDate } = getCurrentMonthRange();

  useEffect(() => {
    dispatch(getOverview({ startDate }));
  }, [dispatch, startDate]);

  return (
    <View style={[styles.card]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.selectedDateText}>
          {statistics?.currentMonthData?.currentMonth}
        </Text>
      </View>

      <View style={styles.detailsSection}>
        <View style={[styles.detailsCard]}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="people" size={20} color={AppColor.primary} />
          </View>
          <Text style={styles.detailKeyText}>Members</Text>
          <Text style={styles.detailValueText}>
            {statistics?.currentMonthData?.newMembers}
          </Text>
          {/* Members */}
          <View
            style={
              statistics?.currentMonthData?.memberIncrease ?? 0 > 0
                ? styles.trendContainer
                : styles.trendDownContainer
            }
          >
            <MaterialIcons
              name={
                statistics?.currentMonthData?.memberIncrease ?? 0 > 0
                  ? "arrow-upward"
                  : "arrow-downward"
              }
              size={12}
              color={
                statistics?.currentMonthData?.memberIncrease ?? 0 > 0
                  ? "#4CAF50"
                  : "red"
              }
            />
            <Text
              style={
                statistics?.currentMonthData?.memberIncrease ?? 0 > 0
                  ? styles.trendupText
                  : styles.trendDownText
              }
            >
              {statistics?.currentMonthData?.memberIncrease}%
            </Text>
          </View>
        </View>

        <View style={[styles.detailsCard]}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="attach-money"
              size={20}
              color={AppColor.primary}
            />
          </View>
          <Text style={styles.detailKeyText}>Revenue</Text>
          <Text style={styles.detailValueText}>
            ${statistics?.currentMonthData?.revenue}
          </Text>
          {/* Revanue */}
          <View
            style={
              statistics?.currentMonthData?.memberIncrease ?? 0 > 0
                ? styles.trendContainer
                : styles.trendDownContainer
            }
          >
            <MaterialIcons
              name={
                statistics?.currentMonthData?.memberIncrease ?? 0 > 0
                  ? "arrow-upward"
                  : "arrow-downward"
              }
              size={12}
              color={
                statistics?.currentMonthData?.memberIncrease ?? 0 > 0
                  ? "#4CAF50"
                  : "red"
              }
            />
            <Text
              style={
                statistics?.currentMonthData?.memberIncrease ?? 0 > 0
                  ? styles.trendupText
                  : styles.trendDownText
              }
            >
              {statistics?.currentMonthData?.revenueIncrease}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatiCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: AppColor.primary,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 5,
  },
  detailsSection: {
    flexDirection: "row",
    padding: 15,
    gap: 15,
  },
  detailsCard: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F3F5",
  },
  iconContainer: {
    backgroundColor: "rgba(66, 100, 251, 0.1)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  detailKeyText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
    marginBottom: 4,
  },
  detailValueText: {
    fontSize: 20,
    fontWeight: "bold",
    color: AppColor.primary,
    marginBottom: 4,
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  trendDownContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(175, 76, 76, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  trendupText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#4CAF50",
    marginLeft: 2,
  },
  trendDownText: {
    fontSize: 12,
    fontWeight: "500",
    color: "red",
    marginLeft: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#E9ECEF",
    marginHorizontal: 15,
  },
  footer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
  },
  footerLabel: {
    fontSize: 12,
    color: "#6C757D",
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColor.primary,
  },
  footerDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E9ECEF",
  },
});
