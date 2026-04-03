import {
  Trophy,
  ChevronRight,
  Sparkles,
  Gift,
  Star,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RankBadge from "@/components/common/RankBadge";
import { MILESTONE_REWARDS } from "@/constants/rewards";
import { Link } from "react-router-dom";

// ─── Sidebar ────────────────────────────────────────────────────
export default function RewardsSidebar({
  nextMilestone,
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
      {/* ── Premium Promotion ── */}
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
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-[12px] font-semibold text-foreground/90">
                  {milestone.basic.title}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <span className="text-[12px] font-bold text-amber-600 dark:text-amber-500">
                  {milestone.premium.title}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-linear-to-r from-amber-500 to-orange-500 text-white shrink-0">
                  PRO
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

      {/* ── Join CTA ── */}
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
