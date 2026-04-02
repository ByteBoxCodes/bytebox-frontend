import { useState } from "react";
import {
  Trophy,
  Lock,
  Check,
  ChevronRight,
  Sparkles,
  Gift,
  Star,
  Code2,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { getLevelInfo } from "@/utils/levelUtils";
import { getRankBadge } from "@/utils/rankBadge";
import RankBadge from "@/components/common/RankBadge";
import {
  MILESTONE_LEVELS,
  MILESTONE_REWARDS,
  type Reward,
  type MilestoneReward,
} from "@/constants/rewards";
import { useGetHeaderProfile } from "@/hooks/useGetHeaderProfile";
import { useUserStats } from "@/hooks/useUserStats";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { Link } from "react-router-dom";

// ─── Types ──────────────────────────────────────────────────────
type RewardState = "locked" | "unlocked" | "claimed";

function getRewardState(
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
function RewardCard({
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

      {/* Product Icon Container (Floating Effect) */}
      <div className="relative mb-5 mt-2 transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
        {/* Glow behind icon */}
        <div
          className={`absolute inset-0 blur-xl scale-125 rounded-full transition-opacity duration-500 ${isClaimable ? "opacity-80" : "opacity-0"} ${reward.bg}`}
        />

        <div
          className={`relative z-10 w-16 h-16 flex items-center justify-center rounded-2xl shadow-xl transition-all duration-500 ${
            isClaimed
              ? "bg-emerald-500/20 shadow-emerald-500/20 text-emerald-500"
              : `${reward.bg} ${reward.color} ${isPremium ? "shadow-amber-500/20" : "shadow-primary/20"}`
          } ring-1 ring-white/10 dark:ring-white/5`}
        >
          {isClaimed ? (
            <Check className="w-8 h-8 drop-shadow-sm" />
          ) : (
            <Icon className="w-8 h-8 drop-shadow-sm" />
          )}
        </div>
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
                <div
                  className={`w-28 h-28 flex items-center justify-center rounded-[2rem] shadow-2xl mb-8 ${reward.bg} ${reward.color} ${isPremium ? "shadow-amber-500/20 ring-1 ring-amber-500/40" : "shadow-primary/20 ring-1 ring-primary/40"}`}
                >
                  <Icon className="w-14 h-14 drop-shadow-lg" />
                </div>
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

// ─── Milestone Section ──────────────────────────────────────────
function MilestoneSection({
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

  // Progress calculations for requirements
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
            {/* Level requirement */}
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

            {/* Problems requirement */}
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

// ─── Mini Progress Dots ─────────────────────────────────────────
function ProgressDots({
  from,
  to,
  userLevel,
}: {
  from: number;
  to: number;
  userLevel: number;
}) {
  const total = to - from - 1;
  if (total <= 0) return null;

  const completed = Math.min(total, Math.max(0, userLevel - from));
  const showCount = Math.min(total, 9); // max 9 dots to keep compact

  return (
    <div className="relative flex gap-4 sm:gap-5">
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0 w-10">
        <div className="flex-1 w-0.5">
          <div
            className={`w-full h-full min-h-6 transition-colors duration-500 ${
              userLevel >= to
                ? "bg-emerald-500/30"
                : "bg-border dark:bg-zinc-800"
            }`}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex-1 flex items-center gap-1 py-1">
        {Array.from({ length: showCount }, (_, i) => {
          const level = from + 1 + Math.round((i * total) / showCount);
          const done = userLevel >= level;
          const isCurr = userLevel === level;
          return (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                isCurr
                  ? "w-2.5 h-2.5 bg-emerald-500 ring-2 ring-emerald-500/20"
                  : done
                    ? "w-1.5 h-1.5 bg-emerald-500/50"
                    : "w-1.5 h-1.5 bg-border dark:bg-zinc-700"
              }`}
              title={`Level ${level}`}
            />
          );
        })}
        <span className="text-[10px] ml-1.5 font-medium text-muted-foreground/50">
          {completed}/{total}
        </span>
      </div>
    </div>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────
function RewardsSidebar({
  nextMilestone,
  currentLevel,
  currentSolved,
  isAuth,
  currentUser,
  levelInfo,
  badge,
  totalPoints,
  milestonesReached,
  isPremiumUser,
}: {
  nextMilestone?: number;
  currentLevel: number;
  currentSolved: number;
  isAuth: boolean;
  currentUser: any;
  levelInfo: any;
  badge: any;
  totalPoints: number;
  milestonesReached: number;
  isPremiumUser: boolean;
}) {
  const milestone = nextMilestone
    ? MILESTONE_REWARDS.find((m) => m.level === nextMilestone)
    : null;

  return (
    <div className="space-y-5 lg:sticky lg:top-8">
      {/* ── User Progress Overview ── */}

      <div className="rounded-2xl border border-amber-500/30 bg-linear-to-br from-amber-500/10 to-orange-500/5 p-5 shadow-sm relative overflow-hidden group flex flex-col justify-between">
        <div className="absolute top-0 -right-2 p-4 opacity-[0.08] pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Sparkles className="w-24 h-24 text-amber-500" />
        </div>
        <div className="relative z-10 mb-4">
          <h3 className="text-[13px] font-black uppercase tracking-widest text-amber-500 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Premium Tier
          </h3>
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            Maximize your progression. Unlock animated frames, exclusive
            legendary avatars, and massive XP multipliers.
          </p>
        </div>
        {!isPremiumUser && (
          <div className="relative z-10 mt-auto">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center w-full gap-1.5 px-4 py-2.5 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-transform"
            >
              Upgrade to PRO <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {isAuth && currentUser ? (
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <RankBadge badge={badge} variant="icon" size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-extrabold text-foreground">
                    Level {levelInfo.level}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${badge.bg} ${badge.color}`}
                  >
                    {badge.title}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                  <span>{milestonesReached}/5 milestones</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border/40">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Progress
                  value={levelInfo.progressPercent}
                  className="h-1.5 flex-1"
                />
                <span className="text-[11px] font-bold text-muted-foreground tabular-nums w-8 text-right">
                  {levelInfo.progressPercent}%
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground text-center">
                {currentSolved} problems solved · {totalPoints} total XP
              </p>
            </div>

            {nextMilestone && (
              <div className="mt-1 pt-3 border-t border-border/40 flex items-start gap-2 text-[11.5px] text-muted-foreground leading-snug">
                <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Next reward at{" "}
                  <strong className="text-foreground">
                    Level {nextMilestone}
                  </strong>{" "}
                  +{" "}
                  {
                    MILESTONE_REWARDS.find((mr) => mr.level === nextMilestone)!
                      .problemsRequired
                  }{" "}
                  problems solved
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 shrink-0">
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-bold text-foreground">
              Sign in to track rewards
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Create an account to earn.
            </p>
          </div>
          <Link
            to="/login"
            className="shrink-0 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      )}

      {/* ── Next Milestone ── */}
      {milestone && isAuth ? (
        <div className="rounded-2xl border border-border/60 bg-card p-5 overflow-hidden relative shadow-sm">
          <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] pointer-events-none">
            <Gift className="w-32 h-32" />
          </div>
          <h3 className="text-[15px] font-bold flex items-center gap-2 mb-4 relative z-10 text-foreground">
            <Star className="text-yellow-500 w-[18px] h-[18px] fill-yellow-500/20" />{" "}
            Next Milestone
          </h3>
          <div className="relative z-10">
            <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
              Reach{" "}
              <strong className="text-foreground">
                Level {milestone.level}
              </strong>{" "}
              and solve{" "}
              <strong className="text-foreground">
                {milestone.problemsRequired}
              </strong>{" "}
              problems to unlock these rewards:
            </p>
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40 border border-border/50">
                <milestone.basic.icon
                  className={`w-4 h-4 shrink-0 ${milestone.basic.color}`}
                />
                <span className="text-[12px] font-semibold text-foreground/90">
                  {milestone.basic.title}
                </span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
                <span className="text-[12px] font-bold text-amber-600 dark:text-amber-500">
                  {milestone.premium.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
          <h3 className="text-[15px] font-bold flex items-center gap-2 mb-2 text-foreground">
            <Trophy className="text-amber-500 w-[18px] h-[18px]" /> Hall of Fame
          </h3>
          <p className="text-[13px] text-muted-foreground">
            Keep solving problems to reveal your next milestone and join the
            elite ranks!
          </p>
        </div>
      )}

      {/* ── Premium Promotion Box ── */}

      {!isAuth && (
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
          <h3 className="text-[14px] font-bold mb-2">Join to Earn</h3>
          <p className="text-[12px] text-muted-foreground mb-4">
            Create an account to track your progress and claim these exclusive
            rewards.
          </p>
          <Link
            to="/signup"
            className="block w-full text-center py-2.5 text-[13px] font-bold bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity"
          >
            Sign Up Free
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function RewardsPage() {
  const isAuth = isAuthenticated();
  const { data: profileData } = useGetHeaderProfile();
  const { data: statsRaw } = useUserStats();
  const token = localStorage.getItem("token");
  const currentUser = token ? (profileData?.data ?? profileData) : null;
  const stats = statsRaw?.data ?? statsRaw;

  const userLevel = currentUser?.level ?? 1;
  const totalPoints = currentUser?.points ?? 0;
  const levelXp = currentUser?.levelXp ?? 0;
  const userSolved = stats?.totalSolved ?? currentUser?.totalSolved ?? 0;
  const isPremiumUser = false;

  const levelInfo = getLevelInfo(totalPoints, userLevel, levelXp);
  const badge = getRankBadge(totalPoints, userLevel, levelXp);

  const [claimedBasic, setClaimedBasic] = useState<Set<string>>(new Set());
  const [claimedPremium, setClaimedPremium] = useState<Set<string>>(new Set());

  const handleClaimBasic = (level: number) => {
    setClaimedBasic((prev) => new Set(prev).add(String(level)));
  };
  const handleClaimPremium = (level: number) => {
    setClaimedPremium((prev) => new Set(prev).add(String(level)));
  };

  const nextMilestone = MILESTONE_LEVELS.find((m) => {
    const r = MILESTONE_REWARDS.find((mr) => mr.level === m)!;
    return !(userLevel >= m && userSolved >= r.problemsRequired);
  });
  const milestonesReached = MILESTONE_LEVELS.filter((m) => {
    const r = MILESTONE_REWARDS.find((mr) => mr.level === m)!;
    return userLevel >= m && userSolved >= r.problemsRequired;
  }).length;

  return (
    <div className="min-h-screen bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-10 flex flex-col lg:flex-row gap-8 items-start">
        {/* ── Main Left Content (Scrollable) ── */}
        <div className="flex-1 max-w-2xl w-full mx-auto lg:mx-0 lg:h-[calc(100vh-120px)] lg:overflow-y-auto scrollbar-hide lg:pr-2">
          {/* ── Journey Header ── */}
          <div className="pb-3 border-b border-border/40 mb-7">
            <h2 className="text-xl font-black text-foreground mb-1.5 tracking-tight">
              Milestone Rewards
            </h2>
            <p className="text-sm text-muted-foreground">
              Keep solving problems and level up to collect all unique titles,
              animated badges, and exclusive avatars.
            </p>
          </div>

          {/* ── Timeline ── */}
          <div className="pt-2">
            {/* Levels 1–9 progress dots */}
            <ProgressDots from={0} to={10} userLevel={userLevel} />

            {MILESTONE_REWARDS.map((milestone, idx) => {
              const nextMilestoneLevel = MILESTONE_LEVELS[idx + 1];
              return (
                <div key={milestone.level}>
                  <MilestoneSection
                    milestone={milestone}
                    userLevel={userLevel}
                    userSolved={userSolved}
                    claimedBasic={claimedBasic}
                    claimedPremium={claimedPremium}
                    isPremiumUser={isPremiumUser}
                    onClaimBasic={handleClaimBasic}
                    onClaimPremium={handleClaimPremium}
                    isLast={idx === MILESTONE_REWARDS.length - 1}
                  />
                  {/* Inter-milestone dots */}
                  {nextMilestoneLevel && (
                    <ProgressDots
                      from={milestone.level}
                      to={nextMilestoneLevel}
                      userLevel={userLevel}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Bottom ── */}
          <p className="text-center text-[11px] text-muted-foreground pb-8 lg:pb-4">
            Keep solving problems to earn XP and unlock the next milestone!
          </p>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="lg:w-[340px] shrink-0 w-full mx-auto lg:mx-0">
          <RewardsSidebar
            nextMilestone={nextMilestone}
            currentLevel={userLevel}
            currentSolved={userSolved}
            isAuth={isAuth}
            currentUser={currentUser}
            levelInfo={levelInfo}
            badge={badge}
            totalPoints={totalPoints}
            milestonesReached={milestonesReached}
            isPremiumUser={isPremiumUser}
          />
        </div>
      </div>
    </div>
  );
}
