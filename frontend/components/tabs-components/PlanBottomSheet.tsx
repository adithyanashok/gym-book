import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import addMemberStyle from "@/app/(member)/styles/add-member.styles";
import PlanInput from "@/app/(onboarding)/components/PlanInput";
import PrimaryButton from "../PrimaryButton";
import { PlanData } from "@/types/plan.type";
interface Props {
  planValue: PlanData | null;
  onNameChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onAmountChange: (value: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  duration?: string;
  amount?: number;
  planName?: string;
}
const PlanBottomSheet = (props: Props) => {
  return (
    <View style={addMemberStyle.modalContainer}>
      <View style={addMemberStyle.modalContent}>
        <Text style={addMemberStyle.modalTitle}>
          {props.planValue ? "Edit Plan" : "New Plan"}
        </Text>

        <>
          <PlanInput
            showDeleteIcon={false}
            label={`Plan`}
            placeholder="Monthly"
            onNameChange={props.onNameChange}
            onDurationChange={props.onDurationChange}
            onAmountChange={props.onAmountChange}
            amount={props?.amount?.toString()}
            duration={props?.duration}
            name={props?.planName}
            onDelete={() => {}}
          />

          <View style={{ marginTop: 20 }}>
            <PrimaryButton
              notFilled={true}
              onClick={props.onSubmit}
              text={props.planValue ? "Edit" : "Done"}
            />
          </View>
        </>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => props.onCancel()}
        >
          <Text style={addMemberStyle.modalCancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlanBottomSheet;
