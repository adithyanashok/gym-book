// components/Snackbar.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SnackbarType } from "@/contexts/SnackbarContext";

interface SnackbarProps {
  message: string;
  type: SnackbarType;
  onHide: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onHide }) => {
  const translateY = React.useRef(new Animated.Value(-100)).current;

  React.useEffect(() => {
    // Slide in animation
    Animated.timing(translateY, {
      toValue: 50,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto hide after 4 seconds
    const timer = setTimeout(() => {
      hideSnackbar();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const hideSnackbar = () => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide();
    });
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#10B981";
      case "error":
        return "#EF4444";
      case "warning":
        return "#F59E0B";
      case "info":
      default:
        return "#4264FB";
    }
  };

  const getIconName = () => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "error":
        return "close-circle";
      case "warning":
        return "warning";
      case "info":
      default:
        return "information-circle";
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor(), transform: [{ translateY }] },
      ]}
    >
      <View style={styles.content}>
        <Ionicons
          name={getIconName()}
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
        <TouchableOpacity onPress={hideSnackbar} style={styles.closeButton}>
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: 16,
    // height: 100,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
});

export default Snackbar;
