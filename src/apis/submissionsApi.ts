import api from "@/lib/axios";
import type { ISubmission, ISubmissionResponse } from "@/types/submission";

export const submitSolution = async (data: ISubmission) => {
  const response = await api.post("/submissions/submit", data);
  return response.data;
};

export const runSolution = async (data: ISubmission) => {
  const response = await api.post("/submissions/run", data);
  return response.data;
};

export const getMySubmissionByProblemId = async (
  problemId: string,
): Promise<ISubmissionResponse[]> => {
  const response = await api.get(`/submissions/problem/${problemId}/my`);
  return response.data;
};

export const getMySubmissionByUserId = async (): Promise<
  ISubmissionResponse[]
> => {
  const response = await api.get(`/submissions/user/my`);
  return response.data;
};
