import api from "@/lib/axios";
import type { Problem } from "@/types/problems";

export const getAllProblems = async (): Promise<Problem[]> => {
  const response = await api.get("/problems");
  return response.data;
};

export const getProblemById = async (id: string): Promise<Problem> => {
  const response = await api.get(`/problems/${id}`);
  return response.data;
};
