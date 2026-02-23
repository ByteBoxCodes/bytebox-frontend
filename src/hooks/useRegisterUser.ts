import { registerUser } from "@/apis/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { loginUser } from "@/apis/authApi";
import { useNavigate } from "react-router-dom";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: async (_, variables) => {
      const loginResponse = await loginUser({
        email: variables.email,
        password: variables.password,
      });

      localStorage.setItem("token", loginResponse.data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/problems");

      toast.success("User registered successfully");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
