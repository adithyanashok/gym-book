import { AppColor } from "@/constants/colors";
import { Member } from "@/types/member.types";
import { formatDate } from "@/utils/dateUtils";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MemberCardProps {
  memberData: Member;
  onPress: () => void;
}

const MemberCard = ({ memberData, onPress }: MemberCardProps) => {
  if (!memberData) {
    return (
      <View style={[styles.card, styles.loadingCard]}>
        <ActivityIndicator size="small" color="#4264FB" />
        <Text style={styles.loadingText}>Loading member data...</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      {/* Member Image with status indicator */}
      <View style={styles.imageContainer}>
        {memberData.image && (
          <Image
            source={{
              uri: memberData.image,
            }}
            style={styles.memberImage}
          />
        )}
      </View>

      {/* Member Details */}
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{memberData?.name}</Text>
        <View style={styles.phoneContainer}>
          <MaterialIcons name="phone" size={14} color="#6b7280" />
          <Text style={styles.memberPhone}>+91{memberData?.phone}</Text>
        </View>
        <View style={styles.joinDateContainer}>
          <MaterialIcons name="event" size={12} color="#9ca3af" />
          <Text style={styles.joinDate}>
            Joined {formatDate(memberData.createdAt)}
          </Text>
        </View>
      </View>

      {/* Plan and Actions */}
      <View style={styles.rightSection}>
        <View
          style={
            memberData.expiresIn <= 0 ? styles.expiredPlanCard : styles.planCard
          }
        >
          {memberData.expiresIn <= 0 ? (
            <Text style={styles.planDays}>Expired</Text>
          ) : (
            <>
              <Text style={styles.planText}>{memberData.plan.name}</Text>
              <Text style={styles.planDays}>
                {memberData.expiresIn} days left
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MemberCard;

const styles = StyleSheet.create({
  loadingCard: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 120,
  },
  loadingText: {
    marginTop: 8,
    color: "#6B7280",
    fontSize: 14,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 1.6,
  },
  imageContainer: {
    position: "relative",
    marginRight: 12,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#f3f4f6",
  },
  statusIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "white",
  },
  memberInfo: {
    flex: 1,
    marginRight: 12,
  },
  memberName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#1f2937",
    marginBottom: 4,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  memberPhone: {
    color: "#6b7280",
    fontSize: 11,
    marginLeft: 6,
  },
  joinDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  joinDate: {
    color: "#9ca3af",
    fontSize: 11,
    marginLeft: 4,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  planCard: {
    backgroundColor: AppColor.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
    alignItems: "center",
    minWidth: 80,
  },
  expiredPlanCard: {
    backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
    alignItems: "center",
    minWidth: 80,
  },
  planText: {
    fontWeight: "600",
    fontSize: 11,
    color: "#ffffff",
    marginBottom: 2,
  },
  planDays: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.8)",
  },
});
