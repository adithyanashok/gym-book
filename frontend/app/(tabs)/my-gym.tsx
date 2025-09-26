import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoCard from "@/components/InfoCard";
import { AntDesign, Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getGym, selectGym } from "@/store/slices/gymSlice";
import { useToast } from "@/hooks/useToasts";
import PrimaryButton from "@/components/PrimaryButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import PlanInput from "../(onboarding)/components/PlanInput";
import { addPlan, fetchPlans, selectedPlans } from "@/store/slices/plansSlice";
import { PlanData } from "@/types/plan.type";
import RNPickerSelect from "react-native-picker-select";
import { AppColor } from "@/constants/colors";
import addMemberStyle from "../(member)/styles/add-member.styles";
const durations = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
];
const MyGym = () => {
  const [planName, setPlanName] = useState<string | null>(null);
  const [duration, setduration] = useState<string>();
  const [amount, setAmount] = useState<number | null>(null);
  const [planValue, setPlanValue] = useState<PlanData | null>();
  const [showImageOptions, setShowImageOptions] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchGym = async () => {
      try {
        await dispatch(getGym()).unwrap();
        await dispatch(fetchPlans()).unwrap();
      } catch (error) {
        toast.error(error);
      }
    };
    fetchGym();
  }, [dispatch]);

  const gym = useSelector(selectGym);
  const plans = useSelector(selectedPlans);

  const handleOpenSheet = (value?: PlanData | null) => {
    setPlanValue(value);
    // bottomSheetRef.current?.expand();
  };

  // Close the bottom sheet
  const handleSubmit = async () => {
    const data: PlanData = {
      amount: amount ?? planValue?.amount!,
      duration: duration ?? planValue?.duration!,
      name: planName ?? planValue?.name!,
      id: 0,
    };
    console.log("DATA ", data);
    if (!data.name || !data.duration || !data.amount) {
      toast.error("Please Fill all fields");
      return;
    }

    try {
      if (planValue) {
      } else {
        // await dispatch(addPlan(data)).unwrap();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <View style={styles.detailsContainer}>
        <Text style={styles.containerHeading}>Gym Details</Text>
        <InfoCard
          icon={<FontAwesome5 name="building" size={20} color="#6B7280" />}
          label="Gym Name"
          value={gym?.gym_name}
        />
        <InfoCard
          icon={<Ionicons name="person-sharp" size={20} color="#6B7280" />}
          label="User Name"
          value={gym?.username}
        />
        <InfoCard
          icon={<Entypo name="phone" size={20} color="#6B7280" />}
          label="Phone"
          value={gym?.user_phone}
        />
        <InfoCard
          icon={<AntDesign name="mail" size={20} color="#6B7280" />}
          label="Email"
          value={gym?.user_email}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.containerHeading}>Plans</Text>
        <View>
          {plans.map((plan) => (
            <TouchableOpacity
              onPress={() => {
                console.log(plan);
                setPlanValue(plan);
                return setShowImageOptions(true);
              }}
              key={plan.id}
              style={[styles.planOption, styles.planOptionSelected]}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View>
                  <Text style={styles.planPrice}>₹{plan.amount}</Text>
                  <Text style={styles.planDuration}>{plan.duration} Month</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <PrimaryButton
            onClick={() => setShowImageOptions(true)}
            text="+ Add plan"
          />
        </View>
      </View>
      <Modal
        visible={showImageOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <View style={addMemberStyle.modalContainer}>
          <View style={addMemberStyle.modalContent}>
            <Text style={addMemberStyle.modalTitle}>
              {planValue ? "Edit Plan" : "New Plan"}
            </Text>

            <>
              <PlanInput
                showDeleteIcon={false}
                label={`Plan`}
                placeholder="Monthly"
                onNameChange={setPlanName}
                onDurationChange={setduration}
                onAmountChange={setAmount}
                amount={planValue?.amount.toString()}
                duration={planValue?.duration}
                name={planValue?.name}
                onDelete={() => {}}
              />

              <View style={{ marginTop: 20 }}>
                <PrimaryButton
                  onClick={handleSubmit}
                  text={planValue ? "Edit" : "Done"}
                />
              </View>
            </>

            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                setPlanValue(null);
                return setShowImageOptions(false);
              }}
            >
              <Text style={addMemberStyle.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MyGym;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    elevation: 5,
    backgroundColor: "#f5f5f5ff",
  },
  bottomSheet: {
    backgroundColor: "#faf7f7ff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#111827",
  },
  detailsContainer: {
    elevation: 2,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    marginTop: 20,
  },
  containerHeading: { fontWeight: "bold", fontSize: 20, marginVertical: 10 },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 8,
  },
  planOption: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 12,
  },
  planRadio: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  radioInnerSelected: {
    backgroundColor: "#4264FB",
  },
  planName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },

  planPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  planDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planDuration: {
    fontSize: 14,
    color: "#6B7280",
  },
  planOptionSelected: {
    borderColor: "#4264FB",
    backgroundColor: "#F0F7FF",
  },
});
