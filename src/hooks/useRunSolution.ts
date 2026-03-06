import { runSolution } from "@/apis/submissionsApi";
import { useMutation } from "@tanstack/react-query";

export const useRunSolution = () => {
  return useMutation({
    mutationFn: runSolution,
  });
};
