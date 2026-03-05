import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePreferredLanguage } from "@/apis/profileApi";

export const useUpdatePreferredLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (language: string) => updatePreferredLanguage(language),
    onSuccess: (_data, language) => {
      localStorage.setItem("preferredLanguage", language);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["header-profile"] });
    },
  });
};
