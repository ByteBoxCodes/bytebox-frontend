import { useQuery } from "@tanstack/react-query";
import { getProblemByTopicId } from "@/apis/problemsApi";

export const useGetProblemsByTopicId = (topicId: string) => {
  return useQuery({
    queryKey: ["problems", topicId],
    queryFn: () => getProblemByTopicId(topicId),
    enabled: !!topicId,
  });
};
