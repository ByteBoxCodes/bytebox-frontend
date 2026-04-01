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
  const response = await api.put("/profile/update", userData);

  return response.data;
};

export const getHeaderProfile = async () => {
  const response = await api.get("/profile/header");
  return response.data;
};

export const updatePreferredLanguage = async (preferredLanguage: string) => {
  const response = await api.put("/users/preferred-language", {
    preferredLanguage: preferredLanguage.toUpperCase(),
  });
  return response.data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/profile/upload-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getPublicProfile = async (username: string) => {
  const response = await api.get(`/profile/${username}`);
  return response.data;
};
