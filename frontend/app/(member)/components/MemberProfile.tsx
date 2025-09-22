import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Member } from "@/types/member.types";
type Props = {
  member: Member;
  photo: string;
};
const MemberProfile = ({ member }: Props) => {
  return (
    <View style={styles.profileSection}>
      {member.image && (
        <Image source={{ uri: member.image }} style={styles.profileImage} />
      )}
      <Text style={styles.memberName}>{member.name}</Text>
      <Text style={styles.memberId}>ID: {member.id}</Text>

      <View style={styles.statusBadge}>
        <View
          style={[
            styles.statusIndicator,
            member.status === "active"
              ? styles.activeIndicator
              : styles.inactiveIndicator,
          ]}
        />
        <Text style={styles.statusText}>
          {member.status === "active" ? "Active Member" : "Inactive Member"}
        </Text>
      </View>
    </View>
  );
};

export default MemberProfile;

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#4264FB",
  },
  memberName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  memberId: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  activeIndicator: {
    backgroundColor: "#10B981",
  },
  inactiveIndicator: {
    backgroundColor: "#EF4444",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4264FB",
  },
});
