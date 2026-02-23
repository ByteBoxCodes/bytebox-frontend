import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/apis/authApi";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
};
