import { forgotPassword } from "@/apis/authApi";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useForgotPassword = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      } else {
        toast.success(
          "We have sent the reset password link on your mail. Please check.",
        );
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while sending the reset link",
      );
    },
  });
};
