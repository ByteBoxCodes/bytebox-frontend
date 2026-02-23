import { registerUser } from "@/apis/authApi";
import { useMutation } from "@tanstack/react-query";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
