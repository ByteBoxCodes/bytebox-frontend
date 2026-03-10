import { submitSolution } from "@/apis/submissionsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSubmitSolutions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitSolution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
      queryClient.invalidateQueries({ queryKey: ["mySubmissions"] });
      queryClient.invalidateQueries({ queryKey: ["mySubProfile"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
};
