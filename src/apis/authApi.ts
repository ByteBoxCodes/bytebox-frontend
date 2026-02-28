import api from "@/lib/axios";
import type { ILoginUser, IRegisterUser, IUpdateProfile } from "@/types/auth";

export const registerUser = async (userData: IRegisterUser) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (userData: ILoginUser) => {
  const response = await api.post("/users/login", userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const getUserStats = async () => {
  const response = await api.get("/users/me/stats");
  return response.data;
};

export const updateProfile = async (userData: IUpdateProfile) => {
  const response = await api.put("/users/profile", userData);

  return response.data;
};
