import { useQuery } from "@tanstack/react-query";
import { handleSearch } from "@/apis/problemsApi";

export const useSearchProblems = (query: string) => {
  return useQuery({
    queryKey: ["problems", "search", query],
    queryFn: () => handleSearch(query),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
