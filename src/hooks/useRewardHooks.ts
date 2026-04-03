import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyRewards, getPublicRewards, claimReward, equipReward } from "@/apis/rewardApi";

// Fetch rewards for the logged-in user
export const useGetMyRewards = () => {
  return useQuery({
    queryKey: ["myRewards"],
    queryFn: getMyRewards,
  });
};

// Fetch rewards for a public user profile
export const useGetPublicRewards = (username: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["publicRewards", username],
    queryFn: () => getPublicRewards(username),
    enabled,
  });
};

export const useClaimReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rewardId: string) => claimReward(rewardId),
    onSuccess: () => {
      // Refresh user's rewards list
      queryClient.invalidateQueries({ queryKey: ["myRewards"] });
      // If XP/Points were awarded, refresh profile
      queryClient.invalidateQueries({ queryKey: ["header-profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
    },
  });
};

export const useEquipReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ rewardId, action }: { rewardId: string; action: "equip" | "unequip" }) =>
      equipReward(rewardId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRewards"] });
      queryClient.invalidateQueries({ queryKey: ["header-profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
