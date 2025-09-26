import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RenewMembership from "../renew-membership";
import { Member } from "@/types/member.types";
import { selectMember } from "@/store/slices/membersSlice";
import { useSelector } from "react-redux";
import InfoCard from "@/components/InfoCard";
type Props = {
  member: Member;
};
const MemberInfo = () => {
  const [showRenewModal, setShowRenewModal] = useState(false);

  const member = useSelector(selectMember);
  if (!member) return;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Membership Information</Text>
      <InfoCard
        icon={
          <MaterialCommunityIcons name="calendar" size={20} color="#6B7280" />
        }
        label="Current Plan"
        value={member.plan.name}
      />
      <InfoCard
        icon={<MaterialCommunityIcons name="clock" size={20} color="#6B7280" />}
        label="Expires In"
        value={member.expiresIn}
        valueStyle={member.expiresIn < 7 ? styles.expiringSoon : null}
      />
      <InfoCard
        icon={
          <MaterialCommunityIcons
            name="calendar-check"
            size={20}
            color="#6B7280"
          />
        }
        label="Join Date"
        value={new Date(member.createdAt).toLocaleDateString()}
      />

      {showRenewModal && (
        <Modal visible={showRenewModal} animationType="slide">
          <RenewMembership
            member={member}
            onClose={() => setShowRenewModal(false)}
            onRenew={(renewalData) => {}}
          />
        </Modal>
      )}
      <TouchableOpacity
        style={styles.renewButton}
        onPress={() => setShowRenewModal(true)}
      >
        <Text style={styles.renewButtonText}>Renew Membership</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemberInfo;

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },

  expiringSoon: {
    color: "#EF4444",
    fontWeight: "600",
  },
  renewButton: {
    backgroundColor: "#4264FB",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },
  renewButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
