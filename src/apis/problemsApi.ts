import api from "@/lib/axios";
import type { IProblem, IProblemList } from "@/types/problems";

export const getAllProblems = async (): Promise<IProblemList[]> => {
  const response = await api.get("/problems");
  return response.data;
};

export const getProblemById = async (id: string): Promise<IProblem> => {
  const response = await api.get(`/problems/${id}`);
  return response.data;
};

export const getProblemByTopic = async (
  topic: string,
): Promise<IProblemList[]> => {
  const response = await api.get(`/problems?topic=${topic}`);
  return response.data;
};

export const handleSearch = async (query: string): Promise<IProblemList[]> => {
  const response = await api.get(`/problems/search?query=${query}`);
  return response.data;
};
