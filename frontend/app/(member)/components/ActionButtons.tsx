import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
type Props = {
  member: any;
};
const ActionButtons = ({ member }: Props) => {
  const handleCall = () => {
    Linking.openURL(`tel:${member.phone}`);
  };

  const handleMessage = () => {
    Linking.openURL(`sms:${member.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${member.email}`);
  };
  return (
    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
        <Ionicons name="call" size={22} color="#4264FB" />
        <Text style={styles.actionButtonText}>Call</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleMessage}>
        <Ionicons name="chatbubble" size={22} color="#4264FB" />
        <Text style={styles.actionButtonText}>Message</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleEmail}>
        <Ionicons name="mail" size={22} color="#4264FB" />
        <Text style={styles.actionButtonText}>Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  actionButton: {
    alignItems: "center",
    padding: 12,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#4264FB",
    marginTop: 4,
  },
});
