import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubscription, verifyPayment } from "@/services/paymentApi";

export const useCreateSubscription = () => {
  return useMutation({
    mutationFn: createSubscription,
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyPayment,
    onSuccess: () => {
      // Invalidate relevant queries like profile to fetch updated subscription status
      queryClient.invalidateQueries({ queryKey: ["headerProfile"] });
    },
  });
};
