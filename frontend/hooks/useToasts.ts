import { useSnackbar } from "@/contexts/SnackbarContext";

export const useToast = () => {
  const { showSnackbar } = useSnackbar();

  const toast = {
    success: (message: string, duration?: number) => {
      showSnackbar(message, "success", duration);
    },
    error: (message: any, duration?: number) => {
      showSnackbar(message ?? "Error Occured", "error", duration);
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
