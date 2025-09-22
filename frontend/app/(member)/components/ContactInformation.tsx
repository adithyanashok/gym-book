import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
type Props = {
  member: any;
};
const ContactInformation = ({ member }: Props) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Information</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
          <Ionicons name="call" size={20} color="#6B7280" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{member.phone}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
          <Ionicons name="mail" size={20} color="#6B7280" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{member.email}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
          <Ionicons name="location" size={20} color="#6B7280" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.infoValue}>{member.address}</Text>
        </View>
      </View>
    </View>
  );
};

export default ContactInformation;

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
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#111827",
  },
});
