import { useQuery } from "@tanstack/react-query";
import { getProblemById } from "@/apis/problems-api";

export const useGetProblemById = (id: string) => {
  return useQuery({
    queryKey: ["problem", id],
    queryFn: () => getProblemById(id),
    enabled: !!id,
  });
};
