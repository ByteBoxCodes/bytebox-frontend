import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "@/apis/leaderboardApi";

export const useGetLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
  });
};
