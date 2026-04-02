import {
  Lock,
  Check,
  Gift,
  Eye,
  Sparkles,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Reward } from "@/constants/rewards";

// ─── Types ──────────────────────────────────────────────────────
export type RewardState = "locked" | "unlocked" | "claimed";

export function getRewardState(
  milestoneLevel: number,
  problemsRequired: number,
  userLevel: number,
  userSolved: number,
  claimedSet: Set<string>,
): RewardState {
  if (claimedSet.has(String(milestoneLevel))) return "claimed";
  if (userLevel >= milestoneLevel && userSolved >= problemsRequired)
    return "unlocked";
  return "locked";
}

// ─── Compact Reward Card ────────────────────────────────────────
export default function RewardCard({
  reward,
  state,
  isPremium,
  isPremiumUser,
  onClaim,
}: {
  reward: Reward;
  state: RewardState;
  isPremium: boolean;
  isPremiumUser: boolean;
  onClaim: () => void;
}) {
  const Icon = reward.icon;
  const premiumLocked = isPremium && !isPremiumUser;
  const isClaimable = state === "unlocked" && !premiumLocked;
  const isClaimed = state === "claimed";
  const isLocked = state === "locked" || premiumLocked;

  return (
    <div
      className={`relative h-full flex flex-col items-center justify-center p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 overflow-hidden group ${
        isClaimed
          ? "border-emerald-500/30 bg-emerald-500/10 shadow-lg shadow-emerald-500/5"
          : isClaimable
            ? `border-border/80 bg-card/40 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/50`
            : "border-border/60 bg-card/40 opacity-90"
      }`}
    >
      {/* Dynamic Background Glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl`}
        style={{
          background: `radial-gradient(circle at center, ${isPremium ? "rgba(245, 158, 11, 0.15)" : "rgba(120, 120, 120, 0.12)"} 0%, transparent 60%)`,
        }}
      />

      {/* Card Border Highlight based on tier */}
      <div
        className={`absolute top-0 inset-x-0 h-1 bg-linear-to-r ${isPremium ? "from-amber-500 via-orange-500 to-red-500" : "from-primary/50 to-primary/10"}`}
      />

      {/* Product Icon / Title Display */}
      <div className="relative mb-5 mt-2 transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
        {reward.type === "title" ? (
          <div className={`relative z-10 ${isLocked ? "grayscale opacity-50" : ""}`}>
            {isClaimed ? (
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-500">
                <Check className="w-8 h-8 drop-shadow-sm" />
              </div>
            ) : (
              <Icon className="" />
            )}
          </div>
        ) : (
          <>
            <div
              className={`absolute inset-0 blur-xl scale-125 rounded-full transition-opacity duration-500 ${isClaimable ? "opacity-80" : "opacity-0"} ${reward.bg} ${isLocked ? "grayscale opacity-0" : ""}`}
            />
            <div
              className={`relative z-10 w-16 h-16 flex items-center justify-center rounded-2xl shadow-xl transition-all duration-500 ${
                isClaimed
                  ? "bg-emerald-500/20 shadow-emerald-500/20 text-emerald-500"
                  : isLocked
                    ? "bg-muted border border-border/50 text-muted-foreground grayscale opacity-60"
                    : `${reward.bg} ${reward.color} ${isPremium ? "shadow-amber-500/20" : "shadow-primary/20"}`
              } ${!isLocked && "ring-1 ring-white/10 dark:ring-white/5"}`}
            >
              {isClaimed ? (
                <Check className="w-8 h-8 drop-shadow-sm" />
              ) : (
                <Icon className="w-8 h-8 drop-shadow-sm" />
              )}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center relative z-10 w-full mb-6">
        <h4
          className={`text-[15px] font-extrabold tracking-tight leading-tight mb-2 ${
            isClaimed
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-foreground"
          }`}
        >
          {reward.title}
        </h4>
        <p className="text-[12px] leading-relaxed line-clamp-2 px-2 min-h-[36px] text-muted-foreground">
          {reward.description}
        </p>
      </div>

      {/* Action */}
      <div className="mt-auto relative z-10">
        {isClaimed ? (
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <Check className="w-3.5 h-3.5" /> Claimed
          </div>
        ) : isClaimable ? (
          <button
            onClick={onClaim}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs transition-all active:scale-95 shadow-lg ${
              isPremium
                ? "bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-orange-500/30 hover:shadow-orange-500/50"
                : "bg-foreground text-background hover:opacity-90 shadow-foreground/20 hover:shadow-foreground/30"
            }`}
          >
            <Gift className="w-4 h-4" /> Claim Reward
          </button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-xs transition-all bg-foreground/5 hover:bg-foreground/10 text-foreground border border-border/60 hover:border-border active:scale-95 shadow-sm">
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm rounded-[2rem] border-border/60 bg-linear-to-b from-card to-background p-8 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-20 blur-3xl z-0"
                style={{
                  background: `radial-gradient(circle at top, ${isPremium ? "#f59e0b" : "var(--border-primary)"} 0%, transparent 80%)`,
                }}
              />
              <div className="relative z-10 flex flex-col items-center text-center">
                {reward.type === "title" ? (
                  <div className="mb-8">
                    <Icon className="" />
                  </div>
                ) : (
                  <div
                    className={`w-28 h-28 flex items-center justify-center rounded-[2rem] shadow-2xl mb-8 ${reward.bg} ${reward.color} ${isPremium ? "shadow-amber-500/20 ring-1 ring-amber-500/40" : "shadow-primary/20 ring-1 ring-primary/40"}`}
                  >
                    <Icon className="w-14 h-14 drop-shadow-lg" />
                  </div>
                )}
                <h3 className="text-2xl font-black tracking-tight mb-3 text-foreground">
                  {reward.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground mb-8">
                  {reward.description}
                </p>
                <div className="w-full relative p-px rounded-xl overflow-hidden mt-2">
                  <div
                    className={`absolute inset-0 ${isPremium ? "bg-linear-to-r from-amber-500 to-orange-500" : "bg-border"}`}
                  />
                  <div className="relative flex items-center justify-center gap-2 p-3.5 rounded-xl bg-card">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[13px] font-bold text-muted-foreground tracking-wide">
                      {premiumLocked
                        ? "Requires PRO to Unlock"
                        : "Locked Objective"}
                    </span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
