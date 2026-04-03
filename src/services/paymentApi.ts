import api from "@/lib/axios";

export const createSubscription = async () => {
  const response = await api.post("/payment/create-subscription");
  return response.data; // Expected { subscriptionId: "..." }
};

export const verifyPayment = async (data: {
  razorpaySubscriptionId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) => {
  const response = await api.post("/payment/verify", data);
  return response.data;
};
