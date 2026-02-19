import { useQuery } from "@tanstack/react-query";
import { getAllTopics } from "@/apis/topics-api";

export const useGetAllTopics = () => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: getAllTopics,
  });
};
