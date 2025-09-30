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
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
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
  deleteMember,
  getMemberById,
  getPayments,
  selectMember,
  selectMemberLoading,
  selectPaymentHistory,
} from "@/store/slices/membersSlice";
import { Button } from "@react-navigation/elements";
import { fetchPlans } from "@/store/slices/plansSlice";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import NoData from "@/components/NoData";
import { useToast } from "@/hooks/useToasts";
import PrimaryButton from "@/components/PrimaryButton";
import { AppColor } from "@/constants/colors";

export default function MemberDetails() {
  const toast = useToast();
  const params = useLocalSearchParams();
  const memberId = Number(params.memberId);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        await dispatch(getMemberById(memberId)).unwrap();
        await dispatch(fetchPlans()).unwrap();
        await dispatch(getPayments(memberId)).unwrap();
      } catch (error) {
        toast.error(error);
      }
    };
    fetchDatas();
  }, [dispatch, memberId]);

  const onDeleteMember = async () => {
    console.log(memberId);
    try {
      await dispatch(deleteMember(memberId)).unwrap();
      router.back();
    } catch (error) {
      toast.error(error);
    }
  };

  const member = useSelector(selectMember);
  const payment = useSelector(selectPaymentHistory);

  const loading = useSelector(
    (state: RootState) => state.members.getByIdLoading
  );
  const error = useSelector((state: RootState) => state.members.error);
  if (loading) {
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
        <PaymentHistory payment={payment} />
        <TouchableOpacity style={styles.removeButton} onPress={onDeleteMember}>
          <Text style={styles.removeButtonText}>Remove {member.name}</Text>
        </TouchableOpacity>
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
  removeButton: {
    backgroundColor: "red",
    borderRadius: 8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 50,
    borderColor: "red",
    borderWidth: 0.8,
  },
  removeButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
