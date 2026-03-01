import { getHeaderProfile } from "@/apis/profileApi";
import { useQuery } from "@tanstack/react-query";

export const useGetHeaderProfile = () => {
  return useQuery({
    queryKey: ["header-profile"],
    queryFn: getHeaderProfile,
  });
};
