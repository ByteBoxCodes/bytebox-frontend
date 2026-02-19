import { getProblemByTopic } from "@/apis/problems-api";
import { useQuery } from "@tanstack/react-query";

export const useGetProblemsByTopic = (topic: string) => {
  return useQuery({
    queryKey: ["problems", topic],
    queryFn: () => getProblemByTopic(topic),
  });
};
