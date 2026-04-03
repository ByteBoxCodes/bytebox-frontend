import api from "@/lib/axios";
import type { IUserReward } from "@/types/rewards";

export const getMyRewards = async (): Promise<{
  data: IUserReward[];
  success: boolean;
}> => {
  const response = await api.get("/rewards/my");
  return response.data;
};

export const getPublicRewards = async (
  username: string,
): Promise<{ data: IUserReward[]; success: boolean }> => {
  const response = await api.get(`/rewards/public/${username}`);
  return response.data;
};

export const claimReward = async (rewardId: string) => {
  const response = await api.post(`/rewards/claim/${rewardId}`);
  return response.data;
};

export const equipReward = async (
  rewardId: string,
  action: "equip" | "unequip",
) => {
  const response = await api.put(`/rewards/${action}/${rewardId}`);
  return response.data;
};
