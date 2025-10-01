import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Member } from "@/types/member.types";
interface Props {
  member: Member;
}
const MemberDetailsHeader = ({ member }: Props) => {
  const router = useRouter();
  console.info(member);

  const handleEdit = () => {
    router.push({
      pathname: "/(member)",
      params: {
        member: JSON.stringify(member),
      },
    });
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#4264FB" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Member Details</Text>
      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Ionicons name="create-outline" size={22} color="#4264FB" />
      </TouchableOpacity>
    </View>
  );
};

export default MemberDetailsHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
