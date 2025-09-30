import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import SafeScreen from "@/components/SafeArea";
import Header from "./components/Header";
import CurrentPlanBanner from "./components/CurrentPlanBanner";
import { useToast } from "@/hooks/useToasts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  selectPlan,
  selectPlanLoading,
  subscriptionPlans,
} from "@/store/slices/subscriptionSlice";
import { selectGym } from "@/store/slices/gymSlice";
import PlanCard from "./components/PlanCard";
import { useStripe } from "@stripe/stripe-react-native";
import { subscriptionApi } from "@/services/subscription";
import { gymApi } from "@/services/gymApi";

const SubscriptionPlansScreen: React.FC = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        await dispatch(subscriptionPlans()).unwrap();
      } catch (error) {
        toast.error(error);
      }
    };
    fetchPlans();
  }, []);

  const plans = useSelector(selectPlan);
  const gym = useSelector(selectGym);
  const planLoading = useSelector(selectPlanLoading);

  const initializePaymentSheet = async (planId: number) => {
    setSelectedPlan(planId);
    const res = await subscriptionApi.subscribe(planId);
    console.log(res);

    const { paymentIntent, ephemeralKey, customer } = res;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Gym Master",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,

      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Adithyan Ashok",
      },
    });
    if (error) {
      toast.error(error);
    }
  };
  const openPaymentSheet = async () => {
    // see below
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      try {
        if (selectedPlan) await gymApi.updateSubscription(selectedPlan);
        toast.success("Success, Your order is confirmed!");
      } catch (error) {
        toast.error(error);
      }
    }
  };

  if (planLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading plans...</Text>
      </View>
    );
  }

  return (
    <SafeScreen>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header />

        {/* Current Plan Banner */}
        {gym?.subscriptionPlan.id && (
          <CurrentPlanBanner
            currentPlan={
              plans.find((e) => e.id === gym?.subscriptionPlan.id)?.name
            }
          />
        )}

        {/* Plans Grid */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => {
            return (
              <PlanCard
                key={plan.id}
                plan={plan}
                gym={gym}
                handleSubscribe={async () => {
                  await initializePaymentSheet(plan.id);
                  await openPaymentSheet();
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },

  plansContainer: {
    padding: 20,
  },
  currentPlanButtonText: {
    color: "#666",
  },
});

export default SubscriptionPlansScreen;
