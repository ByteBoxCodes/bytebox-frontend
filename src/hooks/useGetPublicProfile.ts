import { useQuery } from "@tanstack/react-query";
import { getPublicProfile } from "@/apis/profileApi";

export const useGetPublicProfile = (username: string | undefined) => {
  return useQuery({
    queryKey: ["publicProfile", username],
    queryFn: () => getPublicProfile(username as string),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
  });
};
