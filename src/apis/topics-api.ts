import api from "@/lib/axios";
import type { ITopic } from "@/types/topics";

export const getAllTopics = async (): Promise<ITopic[]> => {
  const response = await api.get("/topics");
  return response.data;
};
