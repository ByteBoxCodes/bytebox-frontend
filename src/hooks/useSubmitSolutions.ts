import { submitSolution } from "@/apis/submissionsApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSubmitSolutions = () => {
  return useMutation({
    mutationFn: submitSolution,
    onSuccess: () => {
      toast.success("Solution submitted successfully");
    },
    onError: () => {
      toast.error("Failed to submit solution");
    },
  });
};
