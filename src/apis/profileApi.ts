import api from "@/lib/axios";
import type { IUpdateProfile } from "@/types/auth";

export const getCurrentUser = async () => {
  const response = await api.get("/profile/me");
  return response.data;
};

export const getUserStats = async () => {
  const response = await api.get("/profile/me/stats");
  return response.data;
};

export const updateProfile = async (userData: IUpdateProfile) => {
  const response = await api.put("/profile", userData);

  return response.data;
};
