// import { View, Text, TouchableOpacity } from "react-native";
// import React from "react";
// import addMemberStyle from "@/app/(member)/styles/add-member.styles";
// import PlanInput from "@/app/(onboarding)/components/PlanInput";
// import PrimaryButton from "../PrimaryButton";
// import { PlanData } from "@/types/plan.type";
// interface Props {
//   planValue: PlanData | null;
//   onNameChange: (value: string) => void;
//   onDurationChange: (value: string) => void;
//   onAmountChange: (value: number) => void;
//   onSubmit: () => void;
//   onCancel: () => void;
//   duration?: string;
//   amount?: number;
//   planName?: string;
// }
// const PlanBottomSheet = (props: Props) => {
//   return (
//     <View style={addMemberStyle.modalContainer}>
//       <View style={addMemberStyle.modalContent}>
//         <Text style={addMemberStyle.modalTitle}>
//           {props.planValue ? "Edit Plan" : "New Plan"}
//         </Text>

//         <>
//           <PlanInput
//             showDeleteIcon={false}
//             label={`Plan`}
//             placeholder="Monthly"
//             onNameChange={props.onNameChange}
//             onDurationChange={props.onDurationChange}
//             onAmountChange={props.onAmountChange}
//             amount={props?.amount?.toString()}
//             duration={props?.duration}
//             name={props?.planName}
//             onDelete={() => {}}
//           />

//           <View style={{ marginTop: 20 }}>
//             <PrimaryButton
//               notFilled={true}
//               onClick={props.onSubmit}
//               text={props.planValue ? "Edit" : "Done"}
//             />
//           </View>
//         </>

//         <TouchableOpacity
//           style={{ alignItems: "center" }}
//           onPress={() => props.onCancel()}
//         >
//           <Text style={addMemberStyle.modalCancelText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default PlanBottomSheet;
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import PlanInput from "@/app/(onboarding)/components/PlanInput";
import PrimaryButton from "../PrimaryButton";
import { PlanData } from "@/types/plan.type";
import { MaterialIcons } from "@expo/vector-icons";
import { AppColor } from "@/constants/colors";

interface Props {
  planValue: PlanData | null;
  onNameChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onAmountChange: (value: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete: (planId: number) => void;
  duration?: string;
  amount?: number;
  planName?: string;
}

const PlanBottomSheet = (props: Props) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={props.onCancel}
        activeOpacity={1}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContent}
      >
        <View style={styles.handle} />

        <View style={styles.header}>
          <MaterialIcons
            name={props.planValue ? "edit" : "add-circle"}
            size={24}
            color={AppColor.primary}
          />
          <Text style={styles.modalTitle}>
            {props.planValue ? "Edit Plan" : "Create New Plan"}
          </Text>
        </View>

        <View>
          <PlanInput
            showDeleteIcon={false}
            label="Plan Name"
            placeholder="e.g., Monthly Premium"
            onNameChange={props.onNameChange}
            onDurationChange={props.onDurationChange}
            onAmountChange={props.onAmountChange}
            amount={props?.amount?.toString()}
            duration={props?.duration}
            name={props?.planName}
            onDelete={() => {}}
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton
              notFilled={false}
              onClick={props.onSubmit}
              text={props.planValue ? "Update Plan" : "Create Plan"}
            />
          </View>
        </View>
        {props.planValue && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => props.onDelete(props.planValue!.id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.cancelButton} onPress={props.onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 34,
    maxHeight: "80%",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },

  buttonContainer: {
    marginTop: 24,
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 16,
  },
  cancelText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  deleteText: { textAlign: "center", fontSize: 14, color: "#ffffff" },
});

export default PlanBottomSheet;
