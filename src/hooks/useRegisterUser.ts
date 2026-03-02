import { registerUser } from "@/apis/authApi";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useRegisterUser = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      } else {
        toast.success(
          "Registration successful. Please check your email to verify your account.",
        );
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
