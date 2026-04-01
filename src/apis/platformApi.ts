import api from "@/lib/axios";

export const getPlatformStats = async () => {
  const response = await api.get("/platform/stats");
  return response.data;
};
