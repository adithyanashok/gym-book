import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Member } from "@/types/member.types";
import { Image } from "expo-image";
type Props = {
  member: Member;
};
const MemberCardTile = ({ member }: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      key={member.id}
      style={[styles.memberCard]}
      onPress={() =>
        router.push({
          pathname: "/(member)/member-details",
          params: { memberId: member.id },
        })
      }
    >
      <View style={styles.memberAvatar}>
        {member.image ? (
          <Image
            source={{
              uri: member.image,
            }}
            style={styles.memberImage}
          />
        ) : (
          <MaterialCommunityIcons name="account" size={32} color="#4264FB" />
        )}
      </View>

      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>
        <View style={styles.phoneContainer}>
          <Ionicons name="call" size={14} color="#6B7280" />
          <Text style={styles.memberPhone}>{member.phone}</Text>
        </View>
      </View>

      <View style={styles.planInfo}>
        <View
          style={[
            styles.planBadge,
            member.plan.name === "Monthly" && styles.planMonthly,
            member.plan.name === "Quarterly" && styles.planQuarterly,
            member.plan.name === "Yearly" && styles.planYearly,
          ]}
        >
          <Text style={styles.planText}>{member.plan.name}</Text>
        </View>
        <Text
          style={[
            styles.daysText,
            member.expiresIn <= 7 ? styles.daysWarning : styles.daysNormal,
          ]}
        >
          {member.status === "expired"
            ? "Expired"
            : `${member.expiresIn} days left`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MemberCardTile;

const styles = StyleSheet.create({
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  memberAvatar: {
    position: "relative",
    marginRight: 16,
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
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  statusActive: {
    backgroundColor: "#10B981",
  },
  statusExpired: {
    backgroundColor: "#EF4444",
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberPhone: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
  planInfo: {
    alignItems: "flex-end",
  },
  planBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
  },
  planMonthly: {
    backgroundColor: "rgba(66, 100, 251, 0.1)",
  },
  planQuarterly: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
  },
  planYearly: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
  },
  planText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4264FB",
  },
  daysText: {
    fontSize: 12,
    fontWeight: "500",
  },
  daysNormal: {
    color: "#6B7280",
  },
  daysWarning: {
    color: "#EF4444",
  },
});
