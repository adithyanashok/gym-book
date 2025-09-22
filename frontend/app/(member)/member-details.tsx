import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import RenewMembership from "./renew-membership";
import MemberDetailsHeader from "./components/MemberDetailsHeader";
import MemberProfile from "./components/MemberProfile";
import ActionButtons from "./components/ActionButtons";
import MemberInfo from "./components/MemberInfo";
import ContactInformation from "./components/ContactInformation";
import PaymentHistory from "./components/PaymentHistory";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  getMemberById,
  selectMember,
  selectMemberLoading,
} from "@/store/slices/membersSlice";
import { Button } from "@react-navigation/elements";
import { fetchPlans } from "@/store/slices/plansSlice";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import NoData from "@/components/NoData";

export default function MemberDetails() {
  const params = useLocalSearchParams();
  const memberId = Number(params.memberId);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMemberById(memberId));
    dispatch(fetchPlans());
  }, [dispatch, memberId]);

  const member = useSelector(selectMember);

  const loading = useSelector(
    (state: RootState) => state.members.getByIdLoading
  );
  const error = useSelector((state: RootState) => state.members.error);
  if (loading === "pending") {
    return <Loading loadingText="Loading" />;
  }
  if (error) {
    return <Error error="Error" errorText="Something went wrong..." />;
  }
  if (!member) {
    return <NoData emptyText="Not found" />;
  }
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <MemberDetailsHeader member={member} />

        {/* Member Profile Section */}
        <MemberProfile member={member!} photo="" />

        {/* Action Buttons */}
        <ActionButtons member={member} />

        {/* Membership Info */}
        <MemberInfo />

        {/* Contact Information */}
        <ContactInformation member={member} />

        {/* Payment History */}
        {/* <PaymentHistory member={member} /> */}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
});
