import { useQuery } from "@tanstack/react-query";
import { getPlatformStats } from "@/apis/platformApi";

export const useGetPlatformStats = () => {
  return useQuery({
    queryKey: ["platformStats"],
    queryFn: getPlatformStats,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};
