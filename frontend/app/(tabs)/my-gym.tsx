import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoCard from "@/components/InfoCard";
import { AntDesign, Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getGym, selectGym } from "@/store/slices/gymSlice";
import { useToast } from "@/hooks/useToasts";

const MyGym = () => {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchGym = async () => {
      try {
        await dispatch(getGym()).unwrap();
      } catch (error) {
        toast.error(error);
      }
    };
    fetchGym();
  }, [dispatch]);

  const gym = useSelector(selectGym);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Fit Hub</Text>
      </View>
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
          {gym?.plans.map((plan) => (
            <TouchableOpacity
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyGym;

const styles = StyleSheet.create({
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
    margin: 10,
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
