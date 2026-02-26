import { loginUser } from "@/apis/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/problems");
      toast.success("Logged in successfully!");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message ?? "Invalid email or password.";
      toast.error("Login failed", {
        description: message,
      });
    },
  });
};
