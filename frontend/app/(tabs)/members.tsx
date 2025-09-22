import { fetchMembers, selectMembers } from "@/store/slices/membersSlice";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store/store";
import FilterBar from "@/components/MemberFilterBar";
import { fetchPlans, selectedPlans } from "@/store/slices/plansSlice";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import MemberCardTile from "@/components/MemberCardTile";

export default function Members() {
  const [activeFilter, setActiveFilter] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchPlans());
    const fetchParams =
      activeFilter && activeFilter !== 0 ? { planId: activeFilter } : {};

    dispatch(fetchMembers(fetchParams));
  }, [dispatch, activeFilter]);

  const members = useSelector(selectMembers);
  const plans = useSelector(selectedPlans);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header - Fixed */}
      <Header />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]} // Make filters sticky when scrolling
      >
        {/* Search Bar */}
        <SearchBar />

        {/* Quick Filters - Sticky when scrolling */}
        <View style={styles.stickySection}>
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            filters={plans}
          />

          {/* Results Count */}
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsText}>
              {members.length} {members.length === 1 ? "member" : "members"}{" "}
              found
            </Text>
          </View>
        </View>

        {/* Members List */}
        {members.length > 0 ? (
          <View style={styles.membersListContainer}>
            {members.map((item) => (
              <MemberCardTile key={item.id} member={item} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="account-search"
              size={64}
              color="#E5E7EB"
            />
            <Text style={styles.emptyStateTitle}>No members found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollView: {
    flex: 1,
  },

  stickySection: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 8,
    paddingTop: 10,
  },

  resultsContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
  },
  membersListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  emptyState: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
