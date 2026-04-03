import { getLevelInfo } from "@/utils/levelUtils";
import { getRankBadge } from "@/utils/rankBadge";
import { MILESTONE_LEVELS, MILESTONE_REWARDS } from "@/constants/rewards";
import { useGetHeaderProfile } from "@/hooks/useGetHeaderProfile";
import { useUserStats } from "@/hooks/useUserStats";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { useIsPremium } from "@/hooks/useIsPremium";
import { useGetMyRewards } from "@/hooks/useRewardHooks";

import MilestoneSection from "@/features/rewards/MilestoneSection";
import ProgressDots from "@/features/rewards/ProgressDots";
import RewardsSidebar from "@/features/rewards/RewardsSidebar";

export default function RewardsPage() {
  const isAuth = isAuthenticated();
  const { data: profileData } = useGetHeaderProfile();
  const { data: statsRaw } = useUserStats();
  const { data: rewardsData } = useGetMyRewards();

  const token = localStorage.getItem("token");
  const currentUser = token ? (profileData?.data ?? profileData) : null;
  const stats = statsRaw?.data ?? statsRaw;

  const userLevel = currentUser?.level ?? 1;
  const totalPoints = currentUser?.points ?? 0;
  const levelXp = currentUser?.levelXp ?? 0;
  const userSolved = stats?.totalSolvedProblems ?? 0;

  // Use the new hook for dynamic premium status
  const isPremiumUser = useIsPremium();

  const levelInfo = getLevelInfo(totalPoints, userLevel, levelXp);
  const badge = getRankBadge(totalPoints, userLevel, levelXp);

  // Build the API rewards list
  const myRewards = rewardsData?.data ?? [];

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
                    myRewards={myRewards}
                    isPremiumUser={isPremiumUser}
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
