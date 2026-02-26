import api from "@/lib/axios";
import type { ISubmission, ISubmissionResponse } from "@/types/submission";

export const submitSolution = async (data: ISubmission) => {
  const response = await api.post("/submissions/submit", data);
  return response.data;
};

export const getMySubmissions = async (
  problemId: string,
): Promise<ISubmissionResponse[]> => {
  const response = await api.get(`/submissions/problem/${problemId}/my`);
  return response.data;
};
