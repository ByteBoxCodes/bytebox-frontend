import { submitSolution } from "@/apis/submissionsApi";
import { useMutation } from "@tanstack/react-query";

export const useSubmitSolutions = () => {
  return useMutation({
    mutationFn: submitSolution,
  });
};
