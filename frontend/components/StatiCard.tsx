import { AppColor } from "@/constants/colors";
import {
  getStatistics,
  selectedStatistics,
} from "@/store/slices/statisticsSlice";
import { AppDispatch } from "@/store/store";
import { shadowStyle } from "@/styles/box-shadow.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentMonthRange } from "../utils/dateUtils";

const StatiCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const statistics = useSelector(selectedStatistics);

  const { startDate } = getCurrentMonthRange();

  useEffect(() => {
    dispatch(getStatistics({ startDate }));
  }, [dispatch, startDate]);

  return (
    <View style={[styles.card]}>
      {/* Header with gradient background */}
      <LinearGradient
        colors={[AppColor.primary, AppColor.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.selectedDateText}>
          {statistics.currentMonthData?.currentMonth}
        </Text>
        <View style={styles.headerIcon}>
          <MaterialIcons name="analytics" size={20} color="white" />
        </View>
      </LinearGradient>

      <View style={styles.detailsSection}>
        <View style={[styles.detailsCard]}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="people" size={20} color={AppColor.primary} />
          </View>
          <Text style={styles.detailKeyText}>Members</Text>
          <Text style={styles.detailValueText}>
            {statistics.currentMonthData?.newMembers}
          </Text>
          <View
            style={
              statistics.currentMonthData?.memberIncrease > 0
                ? styles.trendContainer
                : styles.trendDownContainer
            }
          >
            <MaterialIcons
              name={
                statistics.currentMonthData?.memberIncrease > 0
                  ? "arrow-upward"
                  : "arrow-downward"
              }
              size={12}
              color={
                statistics.currentMonthData?.memberIncrease > 0
                  ? "#4CAF50"
                  : "red"
              }
            />
            <Text
              style={
                statistics.currentMonthData?.memberIncrease <= 0
                  ? styles.trendDownText
                  : styles.trendupText
              }
            >
              {statistics.currentMonthData?.memberIncrease}%
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
            ${statistics.currentMonthData?.revenue}
          </Text>
          <View
            style={
              statistics.currentMonthData?.memberIncrease > 0
                ? styles.trendContainer
                : styles.trendDownContainer
            }
          >
            <MaterialIcons
              name={
                statistics.currentMonthData?.memberIncrease > 0
                  ? "arrow-upward"
                  : "arrow-downward"
              }
              size={12}
              color={
                statistics.currentMonthData?.memberIncrease > 0
                  ? "#4CAF50"
                  : "red"
              }
            />
            <Text
              style={
                statistics.currentMonthData?.memberIncrease <= 0
                  ? styles.trendDownText
                  : styles.trendupText
              }
            >
              {statistics.currentMonthData?.revenueIncrease}%
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
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
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
