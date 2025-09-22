import { useSnackbar } from "@/contexts/SnackbarContext";

export const useToast = () => {
  const { showSnackbar } = useSnackbar();

  const toast = {
    success: (message: string, duration?: number) => {
      showSnackbar(message, "success", duration);
    },
    error: (message: string, duration?: number) => {
      showSnackbar(message, "error", duration);
    },
    info: (message: string, duration?: number) => {
      showSnackbar(message, "info", duration);
    },
    warning: (message: string, duration?: number) => {
      showSnackbar(message, "warning", duration);
    },
  };

  return toast;
};
