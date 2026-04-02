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
} from "lucide-react";
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
  claimedSet: Set<string>
): RewardState {
  if (claimedSet.has(String(milestoneLevel))) return "claimed";
  if (userLevel >= milestoneLevel && userSolved >= problemsRequired) return "unlocked";
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
  const isLocked = state === "locked" || premiumLocked;

  return (
    <div
      className={`relative rounded-xl border p-3.5 transition-all duration-300 ${
        isClaimed
          ? "border-emerald-500/30 bg-emerald-500/5"
          : isClaimable
            ? `${reward.border} ${reward.bg} hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5`
            : "border-border/50 bg-card/40 opacity-55"
      }`}
    >
      {/* Premium tag */}
      {isPremium && (
        <div className="absolute -top-2 right-3">
          <span className="inline-flex items-center gap-0.5 px-1.5 py-px rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-white text-[9px] font-bold uppercase tracking-wider">
            <Sparkles className="w-2 h-2" /> PRO
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className={`shrink-0 p-2 rounded-lg ${
            isClaimed
              ? "bg-emerald-500/10"
              : isLocked
                ? "bg-muted/80"
                : reward.bg
          }`}
        >
          {isLocked ? (
            <Lock className="w-4 h-4 text-muted-foreground/50" />
          ) : isClaimed ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Icon className={`w-4 h-4 ${reward.color}`} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4
            className={`text-[13px] font-bold leading-tight ${
              isLocked
                ? "text-muted-foreground/50"
                : isClaimed
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-foreground"
            }`}
          >
            {reward.title}
          </h4>
          <p
            className={`text-[11px] mt-0.5 leading-snug line-clamp-1 ${
              isLocked ? "text-muted-foreground/30" : "text-muted-foreground"
            }`}
          >
            {reward.description}
          </p>
        </div>

        {/* Action */}
        <div className="shrink-0">
          {isClaimed ? (
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          ) : isClaimable ? (
            <button
              onClick={onClaim}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 ${
                isPremium
                  ? "bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-sm hover:shadow-md"
                  : "bg-foreground text-background hover:opacity-90"
              }`}
              title="Claim"
            >
              <Gift className="w-3.5 h-3.5" />
            </button>
          ) : premiumLocked ? (
            <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Lock className="w-3 h-3 text-amber-500/60" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center">
              <Lock className="w-3 h-3 text-muted-foreground/30" />
            </div>
          )}
        </div>
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
  const basicState = getRewardState(milestone.level, milestone.problemsRequired, userLevel, userSolved, claimedBasic);
  const premiumState = getRewardState(milestone.level, milestone.problemsRequired, userLevel, userSolved, claimedPremium);

  const levelMet = userLevel >= milestone.level;
  const problemsMet = userSolved >= milestone.problemsRequired;
  const reached = levelMet && problemsMet;

  const isCurrent =
    !reached &&
    (milestone.level === 10 ||
      (() => {
        const idx = MILESTONE_LEVELS.indexOf(milestone.level as (typeof MILESTONE_LEVELS)[number]);
        if (idx <= 0) return true;
        const prevLevel = MILESTONE_LEVELS[idx - 1];
        const prevReq = MILESTONE_REWARDS[idx - 1].problemsRequired;
        return userLevel >= prevLevel && userSolved >= prevReq;
      })());

  // Progress calculations for requirements
  const levelProgress = Math.min(100, (userLevel / milestone.level) * 100);
  const problemsProgress = Math.min(100, (userSolved / milestone.problemsRequired) * 100);

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
              <TrendingUp className={`w-3 h-3 shrink-0 ${levelMet ? "text-emerald-500" : "text-muted-foreground/50"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[10px] font-semibold ${levelMet ? "text-emerald-500" : "text-muted-foreground/70"}`}>
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
              <Code2 className={`w-3 h-3 shrink-0 ${problemsMet ? "text-emerald-500" : "text-muted-foreground/50"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[10px] font-semibold ${problemsMet ? "text-emerald-500" : "text-muted-foreground/70"}`}>
                    {Math.min(userSolved, milestone.problemsRequired)}/{milestone.problemsRequired} solved
                  </span>
                  {problemsMet && <Check className="w-3 h-3 text-emerald-500" />}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <RewardCard
            reward={milestone.basic}
            state={basicState}
            isPremium={false}
            isPremiumUser={isPremiumUser}
            onClaim={() => onClaimBasic(milestone.level)}
          />
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* ── User Progress Strip ── */}
        {isAuth && currentUser ? (
          <div className="rounded-xl border border-border bg-card p-4">
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
                  <span className="text-[10px] font-medium text-muted-foreground ml-auto hidden sm:inline">
                    {milestonesReached}/5 milestones
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <Progress
                    value={levelInfo.progressPercent}
                    className="h-1.5 flex-1"
                  />
                  <span className="text-[11px] font-bold text-muted-foreground tabular-nums w-8 text-right">
                    {levelInfo.progressPercent}%
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {userSolved} problems solved · {totalPoints} total XP
                </p>
              </div>
            </div>

            {nextMilestone && (
              <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <ChevronRight className="w-3 h-3 text-amber-500 shrink-0" />
                <span>
                  Next reward at{" "}
                  <span className="font-bold text-foreground">
                    Level {nextMilestone}
                  </span>{" "}
                  + {MILESTONE_REWARDS.find((mr) => mr.level === nextMilestone)!.problemsRequired} problems solved
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10">
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground">
                Sign in to track rewards
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Create an account to earn rewards as you level up.
              </p>
            </div>
            <Link
              to="/login"
              className="shrink-0 px-4 py-1.5 text-xs font-bold rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Sign In
            </Link>
          </div>
        )}

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
        <p className="text-center text-[11px] text-muted-foreground pb-4">
          Keep solving problems to earn XP and unlock the next milestone!
        </p>
      </div>
    </div>
  );
}
