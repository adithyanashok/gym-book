import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
interface Props {
  handleGetStarted: () => void;
}
const Footer = ({ handleGetStarted }: Props) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={handleGetStarted}
      >
        <Text style={styles.getStartedText}>Start Managing Your Gym</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.secondaryGetStartedButton}
        onPress={handleGetStarted}
      >
        <Text style={styles.secondaryGetStartedText}>Log In To Your Gym</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  getStartedButton: {
    backgroundColor: "#4264FB",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#4264FB",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  secondaryGetStartedButton: {
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#4264FB",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryGetStartedText: {
    color: "#4264FB",
    fontSize: 16,
    fontWeight: "600",
  },
});
