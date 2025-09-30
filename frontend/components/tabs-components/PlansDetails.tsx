// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import React from "react";
// import PrimaryButton from "../PrimaryButton";
// import { PlanData } from "@/types/plan.type";
// interface Props {
//   plans: PlanData[];
//   onPlanClick: (plan: PlanData) => void;
//   onSubmit: () => void;
// }
// const PlansDetails = ({ onPlanClick, onSubmit, plans }: Props) => {
//   return (
//     <View style={styles.detailsContainer}>
//       <Text style={styles.containerHeading}>Plans</Text>
//       <View>
//         <View>
//           {plans.map((plan) => (
//             <TouchableOpacity
//               onPress={() => onPlanClick(plan)}
//               key={plan.id}
//               style={[styles.planOption, styles.planOptionSelected]}
//             >
//               <View style={styles.planHeader}>
//                 <Text style={styles.planName}>{plan.name}</Text>
//                 <View>
//                   <Text style={styles.planPrice}>₹{plan.amount}</Text>
//                   <Text style={styles.planDuration}>{plan.duration} Month</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
//           <PrimaryButton
//             notFilled={true}
//             onClick={() => onSubmit()}
//             text="+ Add plan"
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default PlansDetails;

// const styles = StyleSheet.create({
//   detailsContainer: {
//     elevation: 2,
//     backgroundColor: "#ffffff",
//     borderRadius: 10,
//     padding: 20,
//     margin: 10,
//   },
//   containerHeading: { fontWeight: "bold", fontSize: 20, marginVertical: 10 },
//   planHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 20,
//     marginVertical: 8,
//   },
//   planOption: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 12,
//     marginBottom: 12,
//   },

//   planName: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#ffffff",
//   },

//   planPrice: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#ffffff",
//   },
//   planDetails: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   planDuration: {
//     fontSize: 14,
//     color: "#ffffff",
//   },
//   planOptionSelected: {
//     borderColor: "#4264FB",
//     backgroundColor: "#4264FB",
//   },
// });
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import { PlanData } from "@/types/plan.type";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AppColor } from "@/constants/colors";

interface Props {
  plans: PlanData[];
  onPlanClick: (plan: PlanData) => void;
  onSubmit: () => void;
}

const PlansDetails = ({ onPlanClick, onSubmit, plans }: Props) => {
  const getGradientColors = (index: number) => {
    const gradients = [
      ["#667EEA", "#764BA2"],
      ["#F093FB", "#F5576C"],
      ["#4FACFE", "#00F2FE"],
      ["#43E97B", "#38F9D7"],
      ["#FF9A9E", "#FECFEF"],
    ];
    return gradients[index % gradients.length];
  };

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialIcons
            name="card-membership"
            size={24}
            color={AppColor.primary}
          />
          <Text style={styles.containerHeading}>Membership Plans</Text>
        </View>
        <Text style={styles.planCount}>{plans.length} plans</Text>
      </View>

      <View style={styles.plansGrid}>
        {plans.map((plan, index) => (
          <TouchableOpacity
            onPress={() => onPlanClick(plan)}
            key={plan.id}
            style={styles.planCard}
          >
            <View style={styles.planHeader}>
              <View style={styles.planNameContainer}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{plan.duration} Month</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.currency}>₹</Text>
                <Text style={styles.planPrice}>{plan.amount}</Text>
              </View>
            </View>
            <View style={styles.editOverlay}>
              <MaterialIcons name="edit" size={18} color="#FFFFFF" />
              <Text style={styles.editText}>Tap to edit</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add New Plan Card */}
        <TouchableOpacity
          style={[styles.planCard, styles.addPlanCard]}
          onPress={onSubmit}
        >
          <View style={styles.addPlanContent}>
            <View style={styles.addIcon}>
              <MaterialIcons name="add" size={32} color={AppColor.primary} />
            </View>
            <Text style={styles.addPlanText}>Add New Plan</Text>
            <Text style={styles.addPlanSubtext}>Create custom membership</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    margin: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  containerHeading: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#1F2937",
  },
  planCount: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  plansGrid: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  planCard: {
    width: "100%",
    backgroundColor: AppColor.primary,
    height: 150,
    borderRadius: 16,
    shadowRadius: 8,
    elevation: 6,
    padding: 16,
    marginBottom: 16,
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
  },
  planHeader: {
    flex: 1,
  },
  planNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  planName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 8,
  },
  durationBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 8,
  },
  currency: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginRight: 2,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  editOverlay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  editText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "500",
    marginLeft: 4,
  },
  addPlanCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  addPlanContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  addPlanText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  addPlanSubtext: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default PlansDetails;
