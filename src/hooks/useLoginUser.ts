import { loginUser } from "@/apis/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data);
      navigate("/problems");
    },
  });
};
