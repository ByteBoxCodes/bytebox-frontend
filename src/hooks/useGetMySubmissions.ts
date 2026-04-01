import { useQuery } from "@tanstack/react-query";
import {
  getMySubmissionByProblemId,
  getMySubmissionByUserId,
} from "@/apis/submissionsApi";

export const useGetMySubmissions = (problemId: string) => {
  return useQuery({
    queryKey: ["mySubmissions", problemId],
    queryFn: () => getMySubmissionByProblemId(problemId),
    enabled: !!problemId,
  });
};

export const useGetMySubmissionByUserId = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["mySubmissions"],
    queryFn: () => getMySubmissionByUserId(),
    enabled,
  });
};
