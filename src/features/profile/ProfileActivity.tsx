import { Flame, Trophy, Lock } from "lucide-react";
import { useMemo } from "react";
import type { IUserStats, IHeatmapData, IUserProfile } from "@/types/auth";
import { BADGES } from "@/constants/badges";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import RankBadge from "@/components/common/RankBadge";

interface ProfileActivityProps {
  stats: IUserStats;
  user: IUserProfile;
  isOwnProfile?: boolean;
  username?: string;
}

import { useGetMyRewards, useGetPublicRewards } from "@/hooks/useRewardHooks";
import AchievementCard from "../rewards/AchievementCard";
import AllRewardsModal from "./AllRewardsModal";
import type { IUserReward } from "@/types/rewards";

function ContributionHeatmap({ data }: { data: IHeatmapData[] }) {
  const monthsData = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const blocks = [];

    for (let month = 0; month < 12; month++) {
      const firstDay = new Date(currentYear, month, 1);
      const lastDay = new Date(currentYear, month + 1, 0);

      const daysInMonth = lastDay.getDate();
      const startOffset = firstDay.getDay();

      const monthDays: (Date | null)[] = Array(startOffset).fill(null);
      for (let d = 1; d <= daysInMonth; d++) {
        monthDays.push(new Date(currentYear, month, d));
      }

      // Pad the end to ensure complete columns of 7
      while (monthDays.length % 7 !== 0) {
        monthDays.push(null);
      }

      blocks.push({
        label: firstDay.toLocaleString("default", { month: "short" }),
        cells: monthDays,
      });
    }
    return blocks;
  }, []);

  const getDayData = useMemo(() => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    const heatmapMap = new Map(data.map((item) => [item.date, item.count]));

    return (day: Date) => {
      const dateStr = `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`;
      const count = heatmapMap.get(dateStr) || 0;
      let level = 0;
      if (count > 0 && count <= 2) level = 1;
      else if (count > 2 && count <= 5) level = 2;
      else if (count > 5 && count <= 10) level = 3;
      else if (count > 10) level = 4;

      return { level, count };
    };
  }, [data]);

  const colors = [
    "bg-black/5 dark:bg-white/5", // 0
    "bg-[#b9fbc0] dark:bg-green-800", // 1 - light green
    "bg-[#72ef8f] dark:bg-green-700", // 2
    "bg-[#2ee656] dark:bg-green-600", // 3
    "bg-[#0dd136] dark:bg-green-500", // 4
  ];

  const cellClass = "w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px]";
  const gapClass = "gap-[2px] sm:gap-[3px] ";

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent ">
        <div className="min-w-max flex">
          {/* Heatmap grouped by month blocks */}
          <div className="flex gap-[8px] sm:gap-[12px]">
            {monthsData.map((month, mIdx) => (
              <div key={mIdx} className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] text-(--text-secondary) dark:text-(--dk-text-muted) h-[16px] sm:h-[18px] mb-px">
                  {month.label}
                </span>
                <div className={`grid grid-rows-7 grid-flow-col ${gapClass}`}>
                  {month.cells.map((day, dIdx) => {
                    if (!day)
                      return (
                        <div
                          key={`empty-${mIdx}-${dIdx}`}
                          className={`${cellClass} invisible`}
                        />
                      );

                    const { level, count } = getDayData(day);
                    return (
                      <div
                        key={day.toISOString()}
                        className={`${cellClass} ${colors[level]} transition-all hover:ring-[1.5px] hover:ring-foreground/30`}
                        title={`${count} submissions on ${day.toDateString()}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 text-xs text-(--text-secondary) dark:text-(--dk-text-muted) mt-3">
        <span>Less</span>
        <div className="flex gap-[3px]">
          <div
            className={`${cellClass} bg-black/5 dark:bg-white/5 border border-border/20`}
          />
          <div className={`${cellClass} bg-[#b9fbc0] dark:bg-[#1b4332]`} />
          <div className={`${cellClass} bg-[#72ef8f] dark:bg-[#2d6a4f]`} />
          <div className={`${cellClass} bg-[#2ee656] dark:bg-[#40916c]`} />
          <div className={`${cellClass} bg-[#0dd136] dark:bg-[#52b788]`} />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

export default function ProfileActivity({
  stats,
  user,
  isOwnProfile = false,
  username,
}: ProfileActivityProps) {
  const userLevel = user.level || 1;

  // We enable the public query if it's NOT our own profile AND we have a username
  const { data: publicData, isLoading: isPublicLoading } = useGetPublicRewards(
    username || "",
    !isOwnProfile && !!username,
  );

  // We enable the private query if it IS our own profile
  const { data: myData, isLoading: isMyLoading } = useGetMyRewards();

  const isLoading = isOwnProfile ? isMyLoading : isPublicLoading;
  const rawRewards = isOwnProfile ? myData?.data : publicData?.data;
  const rewards: IUserReward[] = Array.isArray(rawRewards) ? rawRewards : [];

  return (
    <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-4 sm:p-5 space-y-8 overflow-hidden">
      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) flex items-center gap-2">
            <Trophy size={15} className="text-yellow-500" />
            Achievements
            </h3>
            <AllRewardsModal rewards={rewards} isOwnProfile={isOwnProfile} />
        </div>
        <div className="flex flex-col gap-4">
          {/* Rank Badges Row */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              Ranks
            </h4>
            <TooltipProvider delayDuration={150}>
              <div className="flex flex-wrap items-center gap-2">
                {BADGES.map((badge, idx) => {
                  const isUnlocked = userLevel >= badge.req;
                  return (
                    <Tooltip key={`rank-${idx}`}>
                      <TooltipTrigger asChild>
                        <div className="relative inline-flex cursor-help">
                          <RankBadge
                            badge={{ ...badge, level: badge.req } as any}
                            variant="pill"
                            className={`transition-all ${!isUnlocked ? "opacity-50 grayscale" : "hover:scale-105"}`}
                          />
                          {!isUnlocked && (
                            <div className="absolute -top-1.5 -right-1.5 z-10 bg-background border border-border rounded-full p-[2px] shadow-sm">
                              <Lock
                                size={10}
                                className="text-muted-foreground"
                              />
                            </div>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <div className="flex flex-col gap-0.5 text-xs text-center py-0.5">
                          <span className="font-bold">{badge.title} Rank</span>
                          <span className="text-muted-foreground">
                            {isUnlocked
                              ? `Unlocked at Lv ${badge.req}`
                              : `Unlocks at Lv ${badge.req}`}
                          </span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>
          </div>

          {/* New Dynamic Rewards Rendered Inline by Row */}
          {isLoading ? (
            <div className="space-y-3">
              <div>
                <div className="h-3 w-14 rounded bg-muted/40 animate-pulse mb-2" />
                <div className="flex items-center gap-2">
                  <div className="w-28 h-8 rounded-lg bg-muted/30 animate-pulse border border-border/30" />
                  <div className="w-32 h-8 rounded-lg bg-muted/30 animate-pulse border border-border/30" />
                </div>
              </div>
              <div>
                <div className="h-3 w-20 rounded bg-muted/40 animate-pulse mb-2" />
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted/30 animate-pulse border border-border/30" />
                  <div className="w-12 h-12 rounded-full bg-muted/30 animate-pulse border border-border/30" />
                </div>
              </div>
            </div>
          ) : (
            Object.entries(
              rewards
                .filter((reward) => reward.type !== "XP" && reward.claimed === true)
                .reduce(
                  (acc, reward) => {
                    const type = reward.type || "Msc";
                    if (!acc[type]) acc[type] = [];
                    acc[type].push(reward);
                    return acc;
                  },
                  {} as Record<string, IUserReward[]>,
                ),
            ).map(([type, typeRewards]) => (
              <div key={type}>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  {type}s
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {typeRewards.map((reward) => (
                    <AchievementCard
                      key={reward.id}
                      reward={reward}
                      isOwnProfile={isOwnProfile}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <hr className="border-border/40" />

      {/* Heatmap Section */}
      <div>
        <h3 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) mb-4 flex items-center gap-2">
          <Flame size={16} className="text-orange-500" />
          Submissions in {new Date().getFullYear()}
        </h3>
        <ContributionHeatmap data={stats.heatmap} />
      </div>
    </section>
  );
}
