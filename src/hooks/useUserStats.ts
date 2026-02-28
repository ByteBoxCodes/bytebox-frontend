import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "@/apis/authApi";

export const useUserStats = () => {
  return useQuery({
    queryKey: ["userStats"],
    queryFn: getUserStats,
    staleTime: 5 * 60 * 1000,
    enabled: !!localStorage.getItem("token"),
  });
};
