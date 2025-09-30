import LogoutButton from "@/components/LogoutButton";
import MemberCard from "@/components/MemberCard";
import NoData from "@/components/NoData";
import StatiCard from "@/components/StatiCard";
import { useToast } from "@/hooks/useToasts";
import { fetchMembers, selectMembers } from "@/store/slices/membersSlice";
import { getOverview, getStatistics } from "@/store/slices/statisticsSlice";
import * as Notifications from "expo-notifications";
import { AppDispatch } from "@/store/store";
import { getCurrentMonthRange } from "@/utils/dateUtils";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectGym, getGym } from "@/store/slices/gymSlice";

export default function Index() {
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const members = useSelector(selectMembers);
  const gym = useSelector(selectGym);
  const { startDate } = getCurrentMonthRange();

  // Ensure gym loaded
  useEffect(() => {
    dispatch(getGym());
  }, [dispatch]);

  // Refresh Scree
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchMembers({})).unwrap();
      await dispatch(getOverview({ startDate })).unwrap();
    } catch (error) {
      toast.error(error);
    }
    setRefreshing(false);
  }, [dispatch, startDate, toast]);

  // Fetch Members
  useEffect(() => {
    dispatch(fetchMembers({}));
  }, [dispatch]);
  if (members.length === 0) {
    return <NoData emptyText="No Members, try adding new member" />;
  }

  return (
    <SafeAreaView edges={["top"]}>
      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <ScrollView
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
          <View style={styles.header}>
            <Text style={styles.welcomeText}>
              Welcome back {gym?.username ?? ""}
            </Text>
            <AntDesign
              onPress={() => {
                router.push("/subscription-plans/plan-screen");
              }}
              name="crown"
              size={24}
              color="black"
            />
          </View>
          <StatiCard />

          <View style={styles.membersContainers}>
            <Text style={styles.containerText}>Expiring soon</Text>

            <FlatList
              scrollEnabled={false}
              style={{ marginTop: 10 }}
              data={members.slice(0, 4)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item) => (
                <MemberCard
                  memberData={item.item}
                  onPress={() => {
                    router.push({
                      pathname: "/(member)/member-details",
                      params: { memberId: item.item.id },
                    });
                  }}
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "300",
  },
  welcome: {
    fontSize: 18,
    fontWeight: "400",
    color: "black",
    // marginBottom: 10,
  },
  containerText: { marginLeft: 10, marginTop: 16, fontSize: 18 },
  membersContainers: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
  },
});
