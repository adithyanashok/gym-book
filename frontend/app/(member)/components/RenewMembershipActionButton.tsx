import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ActionButtonsProps {
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
  confirmSubtext?: string;
  currencySymbol?: string;
  amount?: number;
  cancelButtonStyle?: object;
  cancelTextStyle?: object;
  confirmButtonStyle?: object;
  confirmTextStyle?: object;
  confirmSubtextStyle?: object;
  containerStyle?: object;
  disabled?: boolean;
  loading?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmSubtext,
  currencySymbol = "₹",
  amount,
  cancelButtonStyle,
  cancelTextStyle,
  confirmButtonStyle,
  confirmTextStyle,
  confirmSubtextStyle,
  containerStyle,
  disabled = false,
  loading = false,
}) => {
  const displayAmount = amount !== undefined ? amount : 0;
  const displaySubtext =
    confirmSubtext !== undefined
      ? confirmSubtext
      : `${currencySymbol}${displayAmount.toLocaleString()}`;

  return (
    <View style={[styles.footer, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.cancelButton,
          cancelButtonStyle,
          (disabled || loading) && styles.disabledButton,
        ]}
        onPress={onCancel}
        disabled={disabled || loading}
      >
        <Text style={[styles.cancelButtonText, cancelTextStyle]}>
          {cancelText}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          confirmButtonStyle,
          (disabled || loading) && styles.disabledButton,
        ]}
        onPress={onConfirm}
        disabled={disabled || loading}
      >
        {loading ? (
          <Text style={[styles.confirmButtonText, confirmTextStyle]}>
            Processing...
          </Text>
        ) : (
          <>
            <Text style={[styles.confirmButtonText, confirmTextStyle]}>
              {confirmText}
            </Text>
            <Text style={[styles.confirmButtonSubtext, confirmSubtextStyle]}>
              {displaySubtext}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
    textAlign: "center",
    justifyContent: "center",
  },
  confirmButton: {
    flex: 2,
    backgroundColor: "#4264FB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  confirmButtonSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default ActionButtons;
