import Error from "@/components/Error";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import PlanDistributionChart from "@/components/PlanDistributionChart";
import RevenueTrendChart from "@/components/RevanueTrend";
import SummaryCard from "@/components/SummaryCard";
import {
  getMonthlyRevanues,
  getPlanDistribution,
  getStatistics,
  selectedPlanDistribution,
  selectedRevanue,
  selectedRevanueLoading,
  selectedStatistics,
  selectPlanDistributionLoading,
  selectStatisticsLoading,
} from "@/store/slices/statisticsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { getCurrentMonthRange } from "@/utils/dateUtils";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import MonthPicker from "@/components/MonthPicker";
import { useToast } from "@/hooks/useToasts";

export default function Statistics() {
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { startDate } = getCurrentMonthRange();
  const [selectedMonth, setSelectedMonth] = useState<string>(startDate);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(getPlanDistribution({ startDate: selectedMonth }));
    dispatch(
      getMonthlyRevanues({
        startDate: selectedMonth,
      })
    );
    dispatch(
      getStatistics({
        startDate: selectedMonth,
      })
    );

    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlanDistribution({ startDate: selectedMonth }));
    dispatch(
      getMonthlyRevanues({
        startDate: selectedMonth,
      })
    );
    dispatch(
      getStatistics({
        startDate: selectedMonth,
      })
    );
  }, [dispatch, selectedMonth]);

  const statistics = useSelector(selectedStatistics);
  const plans = useSelector(selectedPlanDistribution);
  const revenues = useSelector(selectedRevanue);

  // Loading State
  const statsLoading = useSelector(selectStatisticsLoading);
  const planLoading = useSelector(selectPlanDistributionLoading);
  const revenueLoading = useSelector(selectedRevanueLoading);

  // Error State
  const error = useSelector((state: RootState) => state.statistics.error);

  // Show loader
  if (
    statsLoading === "pending" ||
    planLoading === "pending" ||
    revenueLoading === "pending"
  ) {
    return <Loading loadingText="Loading" />;
  }
  if (error) {
    return <Error error="Error" errorText="Something went wrong..." />;
  }

  if (!statistics || !plans || !revenues) {
    return <NoData emptyText="No data available" />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0000FF"]}
            tintColor="#0000ff"
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Statistics</Text>
          <MonthPicker
            onMonthSelect={(month) => setSelectedMonth(month)}
            selectedMonth={selectedMonth}
            // currentYear={2025}
          />
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <SummaryCard
              label="Total Members"
              value={statistics.totalMembers}
              backgroundColor="#4264FB"
              iconComponent={
                <Ionicons name="people" size={24} color="#FFFFFF" />
              }
            />

            <SummaryCard
              label="Active Members"
              value={statistics.currentMonthData.activeMembers}
              backgroundColor="#10B981"
              iconComponent={
                <MaterialCommunityIcons
                  name="account-check"
                  size={24}
                  color="#FFFFFF"
                />
              }
            />
          </View>

          <View style={styles.summaryRow}>
            <SummaryCard
              label="New This Month"
              value={statistics.currentMonthData.newMembers}
              backgroundColor="#F59E0B"
              iconComponent={
                <Ionicons name="person-add" size={24} color="#FFFFFF" />
              }
            />
            <SummaryCard
              label="Revanue"
              value={`₹${statistics.currentMonthData.revenue}`}
              backgroundColor="#EF4444"
              iconComponent={
                <FontAwesome5
                  name="money-bill-wave"
                  size={20}
                  color="#FFFFFF"
                />
              }
            />
          </View>
        </View>

        {/* Plan Distribution */}
        {plans.length > 0 && (
          <PlanDistributionChart data={plans} title="Plan Distribution" />
        )}

        {/* Revenue Chart */}
        {revenues.monthlyRevenues.length > 0 && <RevenueTrendChart />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  timeRangeSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginRight: 4,
  },
  summaryContainer: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
