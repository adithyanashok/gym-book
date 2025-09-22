// contexts/SnackbarContext.tsx
import Snackbar from "@/components/Snackbar";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { View, StyleSheet } from "react-native";

export type SnackbarType = "success" | "error" | "info" | "warning";

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    type?: SnackbarType,
    duration?: number
  ) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>("info");
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const showSnackbar = (
    msg: string,
    snackbarType: SnackbarType = "info",
    duration: number = 3000
  ) => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setMessage(msg);
    setType(snackbarType);
    setVisible(true);

    // Auto hide after duration
    const id = setTimeout(() => {
      setVisible(false);
    }, duration);

    setTimeoutId(id);
  };

  const hideSnackbar = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setVisible(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      {visible && (
        <Snackbar message={message} type={type} onHide={hideSnackbar} />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
