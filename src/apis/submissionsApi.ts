import api from "@/lib/axios";
import type { ISubmission } from "@/types/submission";

export const submitSolution = async (data: ISubmission) => {
  const response = await api.post("/submissions/submit", data);
  // console.log(response);
  return response.data;
};
