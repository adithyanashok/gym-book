import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getGym, selectGym } from "@/store/slices/gymSlice";
import { useToast } from "@/hooks/useToasts";

import {
  addPlan,
  editPlan,
  fetchPlans,
  selectedPlans,
} from "@/store/slices/plansSlice";
import { PlanData } from "@/types/plan.type";
import GymDetails from "@/components/tabs-components/GymDetails";
import PlansDetails from "@/components/tabs-components/PlansDetails";
import PlanBottomSheet from "@/components/tabs-components/PlanBottomSheet";
import { Modal, ScrollView } from "react-native";
import LogoutButton from "@/components/LogoutButton";

const MyGym = () => {
  // STATES
  const [planName, setPlanName] = useState<string | null>(null);
  const [duration, setduration] = useState<string>();
  const [amount, setAmount] = useState<number | null>(null);
  const [planValue, setPlanValue] = useState<PlanData | null>(null);
  const [showImageOptions, setShowBottomSheet] = useState(false);

  // TOAST
  const toast = useToast();

  // Dispatch
  const dispatch = useDispatch<AppDispatch>();

  // USE-EFFECT
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

  // SELECTTORS
  const gym = useSelector(selectGym);
  const plans = useSelector(selectedPlans);

  // SUBMIT DATA
  const handleSubmit = async () => {
    // DATA
    const data: PlanData = {
      amount: amount ?? planValue?.amount!,
      duration: duration ?? planValue?.duration!,
      name: planName ?? planValue?.name!,
      id: planValue?.id ?? 0,
    };

    // Check value is not null
    if (!data.name || !data.duration || !data.amount) {
      toast.error("Please Fill all fields");
      return;
    }

    try {
      if (planValue) {
        await dispatch(editPlan(data)).unwrap();
      } else {
        await dispatch(addPlan(data)).unwrap();
      }

      setShowBottomSheet(false);
      setPlanValue(null);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <GymDetails gym={gym} />
      <PlansDetails
        onPlanClick={(plan) => {
          console.log(plan);
          setPlanValue(plan);
          return setShowBottomSheet(true);
        }}
        onSubmit={() => setShowBottomSheet(true)}
        plans={plans}
      />

      <Modal
        visible={showImageOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBottomSheet(false)}
      >
        <PlanBottomSheet
          onNameChange={setPlanName}
          onDurationChange={setduration}
          onAmountChange={setAmount}
          amount={planValue?.amount}
          duration={planValue?.duration}
          planName={planValue?.name}
          onCancel={() => {
            setPlanValue(null);
            return setShowBottomSheet(false);
          }}
          onSubmit={handleSubmit}
          planValue={planValue}
        />
      </Modal>
    </ScrollView>
  );
};

export default MyGym;
