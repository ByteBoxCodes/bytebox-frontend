import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/apis/authApi";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useVerifyUser = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      // toast will be handled by the component or we can leave it here
      // toast.success("Email verified successfully! You can now log in.");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to verify email");
    },
  });
};
