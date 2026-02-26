import { useQuery } from "@tanstack/react-query";
import { getMySubmissions } from "@/apis/submissionsApi";

export const useGetMySubmissions = (problemId: string) => {
  return useQuery({
    queryKey: ["mySubmissions", problemId],
    queryFn: () => getMySubmissions(problemId),
    enabled: !!problemId,
  });
};
