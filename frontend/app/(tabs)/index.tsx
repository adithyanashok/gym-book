import LogoutButton from "@/components/LogoutButton";
import MemberCard from "@/components/MemberCard";
import MemberCardTile from "@/components/MemberCardTile";
import NoData from "@/components/NoData";
import SafeScreen from "@/components/SafeArea";
import StatiCard from "@/components/StatiCard";
import { selectAdmin } from "@/store/slices/adminSlice";
import { fetchMembers, selectMembers } from "@/store/slices/membersSlice";

import { AppDispatch } from "@/store/store";
import { shadowStyle } from "@/styles/box-shadow.styles";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const members = useSelector(selectMembers);

  useEffect(() => {
    dispatch(fetchMembers({}));
  }, [dispatch]);
  if (members.length === 0) {
    return <NoData emptyText="No Members, try adding new member" />;
  }
  return (
    <SafeScreen>
      <View
        style={{
          padding: 10,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatiCard />

          <View style={[{ backgroundColor: "white" }]}>
            <Text style={styles.latestMembersText}>Latest Members</Text>

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
          <LogoutButton />
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 10,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "400",
    color: "black",
    marginBottom: 10,
  },
  latestMembersText: { marginLeft: 10, marginTop: 16, fontSize: 18 },
});
