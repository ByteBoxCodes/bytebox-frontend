import { Link, useNavigate } from "react-router-dom";
import { Check, X, Sparkles, Trophy, Rocket, Shield, Gift, Loader2 } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { useCreateSubscription, useVerifyPayment } from "@/hooks/usePaymentHooks";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { useIsPremium } from "@/hooks/useIsPremium";
import { toast } from "sonner";

export default function PricingPage() {
  const navigate = useNavigate();
  const { mutateAsync: createSub, isPending: isCreating } = useCreateSubscription();
  const { mutateAsync: verifyPay, isPending: isVerifying } = useVerifyPayment();
  const isPremiumUser = useIsPremium();
  const isLoading = isCreating || isVerifying;

  const handleUpgrade = async () => {
    if (!isAuthenticated()) {
      toast.info("Please login to upgrade to PRO");
      navigate("/login");
      return;
    }

    try {
      const data = await createSub();
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this is set in .env
        subscription_id: data.subscriptionId,
        name: "ByteBox Codes",
        description: "PRO Monthly Subscription",
        handler: async function (response: any) {
          try {
            await verifyPay({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySubscriptionId: response.razorpay_subscription_id,
              razorpaySignature: response.razorpay_signature,
            });
            toast.success("PRO Subscription activated successfully! Welcome to the Elite.");
            navigate("/rewards"); // Redirect to rewards to see the benefits
          } catch (err) {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        theme: {
          color: "#f59e0b",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        toast.error("Payment failed", {
          description: response.error.description,
        });
      });
      rzp.open();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to initiate secure checkout");
    }
  };

  return (
    <>
      <div className="min-h-[85vh] bg-background text-foreground py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
        {/* Compact Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Unlock Your Potential
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">
            Choose Your Journey
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-[15px] leading-relaxed">
            Level up faster, collect legendary rewards, and stand out on the
            leaderboard.
          </p>
        </div>

        <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch relative z-10">
          {/* Background glow behind pro */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full z-[-1]" />

          {/* Basic Plan */}
          <div className="flex flex-col p-8 rounded-[2rem] border border-border/80 bg-card/60 backdrop-blur-md shadow-sm transition-all hover:border-border">
            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
              Basic
            </h3>
            <div className="flex items-baseline gap-2 mb-8 mt-2">
              <span className="text-4xl font-black">Free</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1 text-sm text-muted-foreground font-medium">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Access to standard coding problems</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Standard milestones & basic rewards</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Global Leaderboard participation</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-muted-foreground/40 shrink-0" />
                <span className="text-muted-foreground/60 line-through">
                  No bonus XP drops
                </span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-muted-foreground/40 shrink-0" />
                <span className="text-muted-foreground/60 line-through">
                  No animated profile cosmetics
                </span>
              </li>
            </ul>
            <Link
              to="/"
              className="w-full py-3 px-4 text-center rounded-xl text-sm font-bold bg-muted/60 text-foreground border border-border hover:bg-muted transition-colors"
            >
              Start Coding Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col p-8 rounded-[2rem] border-2 border-amber-500/40 shadow-xl shadow-amber-500/10 bg-linear-to-b from-amber-500/5 to-card relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-amber-400 via-orange-500 to-rose-500" />

            <div className="absolute top-6 right-6">
              <div className="px-3 py-1 rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/30 animate-pulse">
                Most Popular
              </div>
            </div>

            <h3 className="text-xl font-bold mb-1 flex items-center gap-2 text-amber-500">
              <Trophy className="w-5 h-5" /> PRO
            </h3>
            <div className="flex items-baseline gap-1.5 mb-8 mt-2">
              <span className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-amber-500 to-orange-500">
                ₹49
              </span>
              <span className="text-sm font-bold text-muted-foreground">
                /month
              </span>
            </div>

            <ul className="space-y-4 mb-10 flex-1 text-sm text-foreground/90 font-medium">
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-amber-500/20 shrink-0 mt-0.5">
                  <Rocket className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span>
                  <strong className="text-foreground">Extra 10 XP</strong> on
                  every question solved
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-amber-500/20 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span>
                  Exclusive{" "}
                  <strong className="text-foreground">
                    animated titles & frames
                  </strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-amber-500/20 shrink-0 mt-0.5">
                  <Gift className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span>
                  Unlock all{" "}
                  <strong className="text-foreground">Premium Rewards</strong>{" "}
                  in milestones
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-amber-500/20 shrink-0 mt-0.5">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span>
                  Glowing{" "}
                  <strong className="text-foreground">PRO profile badge</strong>
                </span>
              </li>
              <li className="flex items-start gap-3 pt-2 mt-2 border-t border-amber-500/10">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Plus everything in Basic
                </span>
              </li>
            </ul>

            <div className="space-y-3 mt-auto">
              <button
                onClick={handleUpgrade}
                disabled={isLoading || isPremiumUser}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-center rounded-xl text-sm font-bold text-white bg-linear-to-r from-amber-500 to-orange-500 hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : isPremiumUser ? (
                  "Currently Active"
                ) : (
                  "Upgrade to Premium"
                )}
              </button>
              <p className="text-center text-[11px] font-medium text-muted-foreground/80">
                {isPremiumUser ? "You are a PRO member." : "Billed monthly. Cancel anytime."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
