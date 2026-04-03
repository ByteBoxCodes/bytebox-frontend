import { useGetHeaderProfile } from "./useGetHeaderProfile";

export const useIsPremium = () => {
  const { data } = useGetHeaderProfile();
  
  const user = data?.data ?? data;
  
  // Determine premium status safely.
  return Boolean(user?.premium || user?.isPremiumUser || user?.isPremium || false);
};
