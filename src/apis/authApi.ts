import api from "@/lib/axios";
import type { ILoginUser, IRegisterUser } from "@/types/auth";

export const registerUser = async (userData: IRegisterUser) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (userData: ILoginUser) => {
  const response = await api.post("/users/login", userData);
  return response.data;
};
export const verifyEmail = async (token: string) => {
  const response = await api.post(`/users/verify?token=${token}`);
  return response.data;
};
