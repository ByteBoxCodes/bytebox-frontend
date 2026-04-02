import {
  Trophy,
  Check,
  Sparkles,
  Star,
  Code2,
  TrendingUp,
} from "lucide-react";
import {
  MILESTONE_LEVELS,
  MILESTONE_REWARDS,
  type MilestoneReward,
} from "@/constants/rewards";
import RewardCard, { getRewardState } from "./RewardCard";

// ─── Milestone Section ──────────────────────────────────────────
export default function MilestoneSection({
  milestone,
  userLevel,
  userSolved,
  claimedBasic,
  claimedPremium,
  isPremiumUser,
  onClaimBasic,
  onClaimPremium,
  isLast,
}: {
  milestone: MilestoneReward;
  userLevel: number;
  userSolved: number;
  claimedBasic: Set<string>;
  claimedPremium: Set<string>;
  isPremiumUser: boolean;
  onClaimBasic: (level: number) => void;
  onClaimPremium: (level: number) => void;
  isLast: boolean;
}) {
  const basicState = getRewardState(
    milestone.level,
    milestone.problemsRequired,
    userLevel,
    userSolved,
    claimedBasic,
  );
  const premiumState = getRewardState(
    milestone.level,
    milestone.problemsRequired,
    userLevel,
    userSolved,
    claimedPremium,
  );

  const levelMet = userLevel >= milestone.level;
  const problemsMet = userSolved >= milestone.problemsRequired;
  const reached = levelMet && problemsMet;

  const isCurrent =
    !reached &&
    (milestone.level === 10 ||
      (() => {
        const idx = MILESTONE_LEVELS.indexOf(
          milestone.level as (typeof MILESTONE_LEVELS)[number],
        );
        if (idx <= 0) return true;
        const prevLevel = MILESTONE_LEVELS[idx - 1];
        const prevReq = MILESTONE_REWARDS[idx - 1].problemsRequired;
        return userLevel >= prevLevel && userSolved >= prevReq;
      })());

  const levelProgress = Math.min(100, (userLevel / milestone.level) * 100);
  const problemsProgress = Math.min(
    100,
    (userSolved / milestone.problemsRequired) * 100,
  );

  return (
    <div className="relative flex gap-4 sm:gap-5">
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0 w-10">
        <div
          className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-400 ${
            reached
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
              : isCurrent
                ? "bg-foreground text-background shadow-md ring-4 ring-foreground/10"
                : "bg-muted text-muted-foreground/60 border border-border"
          }`}
        >
          {reached ? (
            <Trophy className="w-4 h-4" />
          ) : (
            <span>{milestone.level}</span>
          )}
          {isCurrent && (
            <span className="absolute inset-0 rounded-xl animate-ping bg-foreground/10" />
          )}
        </div>

        {!isLast && (
          <div className="flex-1 w-0.5 mt-1">
            <div
              className={`w-full h-full min-h-8 transition-colors duration-500 ${
                reached ? "bg-emerald-500/30" : "bg-border dark:bg-zinc-800"
              }`}
            />
          </div>
        )}
      </div>

      {/* Content column */}
      <div className="flex-1 pb-8 min-w-0">
        {/* Level label + badges */}
        <div className="flex items-center gap-2 mb-1 h-10 flex-wrap">
          <h3
            className={`text-sm font-extrabold tracking-tight ${
              reached
                ? "text-emerald-600 dark:text-emerald-400"
                : isCurrent
                  ? "text-foreground"
                  : "text-muted-foreground/60"
            }`}
          >
            Level {milestone.level}
          </h3>
          {reached && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
              Unlocked
            </span>
          )}
          {isCurrent && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground bg-foreground/10 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5" /> Next Goal
            </span>
          )}
        </div>

        {/* Requirements row */}
        {!reached && (
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <TrendingUp
                className={`w-3 h-3 shrink-0 ${levelMet ? "text-emerald-500" : "text-muted-foreground/50"}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={`text-[10px] font-semibold ${levelMet ? "text-emerald-500" : "text-muted-foreground/70"}`}
                  >
                    Lv {userLevel}/{milestone.level}
                  </span>
                  {levelMet && <Check className="w-3 h-3 text-emerald-500" />}
                </div>
                <div className="h-1 rounded-full bg-border dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${levelMet ? "bg-emerald-500" : "bg-foreground/30"}`}
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="w-px h-6 bg-border shrink-0" />

            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <Code2
                className={`w-3 h-3 shrink-0 ${problemsMet ? "text-emerald-500" : "text-muted-foreground/50"}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={`text-[10px] font-semibold ${problemsMet ? "text-emerald-500" : "text-muted-foreground/70"}`}
                  >
                    {Math.min(userSolved, milestone.problemsRequired)}/
                    {milestone.problemsRequired} solved
                  </span>
                  {problemsMet && (
                    <Check className="w-3 h-3 text-emerald-500" />
                  )}
                </div>
                <div className="h-1 rounded-full bg-border dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${problemsMet ? "bg-emerald-500" : "bg-foreground/30"}`}
                    style={{ width: `${problemsProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reward cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-4">
          <div className="flex flex-col gap-2.5">
            <h5 className="text-[11px] font-black tracking-widest uppercase text-muted-foreground ml-1">
              Basic Reward
            </h5>
            <RewardCard
              reward={milestone.basic}
              state={basicState}
              isPremium={false}
              isPremiumUser={isPremiumUser}
              onClaim={() => onClaimBasic(milestone.level)}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <h5 className="text-[11px] font-black tracking-widest uppercase text-amber-500 ml-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Pro Reward
            </h5>
            <RewardCard
              reward={milestone.premium}
              state={premiumState}
              isPremium={true}
              isPremiumUser={isPremiumUser}
              onClaim={() => onClaimPremium(milestone.level)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
