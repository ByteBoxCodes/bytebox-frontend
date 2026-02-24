import api from "@/lib/axios";
import type { ISubmission } from "@/types/submission";

export const submitSolution = async (data: ISubmission) => {
  const response = await api.post("/submissions", data);
  return response.data.data;
};
