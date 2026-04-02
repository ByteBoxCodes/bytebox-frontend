import { Trophy, Gift, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { ITopic } from "@/types/topics";
import type { IProblemList } from "@/types/problems";
import { useMemo } from "react";
import { getLevelInfo } from "@/utils/levelUtils";
import { useProfile } from "@/hooks/useProfile";
import { getRankBadge } from "@/utils/rankBadge";
import RankBadge from "@/components/common/RankBadge";
import { RankJourney } from "@/components/common/RankJourney";

interface RightSidebarProps {
  topics: ITopic[];
  selectedTopicId: string;
  problems: IProblemList[];
}

interface DifficultyStats {
  total: number;
  solved: number;
  percent: number;
}

export default function RightSidebar({
  topics,
  selectedTopicId,
  problems,
}: RightSidebarProps) {
  const { data: userProfile } = useProfile();
  const user = userProfile?.data;
  const points = user?.points ?? 0;
  const levelInfo = getLevelInfo(points, user?.level, user?.levelXp);

  const currentTopic = topics.find((topic) => topic.id == selectedTopicId);

  const solved = currentTopic?.solvedProblems || 0;
  const totalSystemProblems = currentTopic?.totalProblems || 0;

  const progressPercent =
    totalSystemProblems > 0
      ? Math.min(100, Math.round((solved / totalSystemProblems) * 100))
      : 0;

  // Compute difficulty breakdown from the problems list
  const difficultyBreakdown = useMemo(() => {
    const stats: Record<string, DifficultyStats> = {
      EASY: { total: 0, solved: 0, percent: 0 },
      MEDIUM: { total: 0, solved: 0, percent: 0 },
      HARD: { total: 0, solved: 0, percent: 0 },
    };

    problems.forEach((p) => {
      if (stats[p.difficulty]) {
        stats[p.difficulty].total += 1;
        if (p.solved) {
          stats[p.difficulty].solved += 1;
        }
      }
    });

    // Calculate percentages
    for (const key of Object.keys(stats)) {
      stats[key].percent =
        stats[key].total > 0
          ? Math.min(
              100,
              Math.round((stats[key].solved / stats[key].total) * 100),
            )
          : 0;
    }

    return stats;
  }, [problems]);

  const difficultyConfig = [
    {
      key: "EASY",
      label: "Easy",
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      trackColor: "bg-emerald-500/15",
    },
    {
      key: "MEDIUM",
      label: "Medium",
      color: "bg-amber-500",
      textColor: "text-amber-500",
      trackColor: "bg-amber-500/15",
    },
    {
      key: "HARD",
      label: "Hard",
      color: "bg-red-500",
      textColor: "text-red-500",
      trackColor: "bg-red-500/15",
    },
  ];

  const badge = getRankBadge(points, user?.level, user?.levelXp);

  return (
    <div className="space-y-6">
      {/* Stats Widget (Moved to Top) */}
      <div className="pb-5 border-b border-border">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="ml-3 text-lg font-bold text-foreground font-pj tracking-tight">
            Your Progress
          </h3>
        </div>

        {/* Overall Progress Bar */}
        <div className="mb-5 space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-foreground">Overall</span>
            <span className="text-xs font-semibold text-muted-foreground">
              {progressPercent}%
            </span>
          </div>
          <Progress
            value={progressPercent}
            className="h-2 w-full bg-secondary"
          />
          <p className="text-xs text-muted-foreground">
            {solved} of {totalSystemProblems} problems solved
          </p>
        </div>

        {/* Difficulty Breakdown */}
        <div className="space-y-3">
          {difficultyConfig.map(
            ({ key, label, color, textColor, trackColor }) => {
              const stats = difficultyBreakdown[key];
              return (
                <div key={key} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-semibold ${textColor}`}>
                      {label}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {stats.solved}/{stats.total}
                    </span>
                  </div>
                  <div
                    className={`h-1.5 w-full rounded-full overflow-hidden ${trackColor}`}
                  >
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-500 ease-out`}
                      style={{ width: `${stats.percent}%` }}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* Topic Mastery Reward Widget */}
      <div
        className={`relative overflow-hidden rounded-xl p-5 border shadow-sm transition-all duration-500 ${
          progressPercent === 100
            ? "bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-500/5 dark:border-emerald-500/20"
            : "bg-primary/5 border-primary/20"
        }`}
      >
        <div className="absolute -right-6 -bottom-6 opacity-[0.08] pointer-events-none">
          {progressPercent === 100 ? (
            <Trophy className="w-28 h-28 text-emerald-500" />
          ) : (
            <Gift className="w-28 h-28 text-primary" />
          )}
        </div>

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-foreground">
              Topic Mastery Reward
            </h3>
            {progressPercent === 100 ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                <CheckCircle2 size={12} className="stroke-3" />
                Claimed
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                100 XP
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pr-4">
            {progressPercent === 100
              ? "Incredible work! You've solved every problem in this topic and claimed your 100 XP mastery bonus."
              : "Solve all problems in this topic to prove your mastery and earn an automatic bonus of 100 XP!"}
          </p>
        </div>
      </div>

      {/* Level Progress Widget (Moved to Bottom) */}
      <div className="relative overflow-hidden w-full">
        <div className="relative z-10 flex items-center justify-between mb-5">
          <div className="flex items-center gap-3.5">
            <RankBadge
              badge={badge}
              variant="icon"
              size="md"
              className={`border shadow-inner ${badge.border}`}
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted) mb-0.5">
                Current Rank
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-(--text-primary) dark:text-(--dk-text) tracking-tight leading-none">
                  Level {levelInfo.level}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color} ${badge.bg} ${badge.border}`}
                >
                  {badge.title}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted) mb-0.5">
              Total XP
            </p>
            <p
              className={`text-lg font-extrabold ${badge.color} tracking-tight leading-none`}
            >
              {levelInfo.currentPoints}
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className={`tracking-tight ${badge.color}`}>
              {levelInfo.levelXp}{" "}
              <span className="text-[10px] uppercase">XP</span>
            </span>
            <span className="text-(--text-secondary) dark:text-(--dk-text-muted) tracking-tight">
              {levelInfo.pointsForNextLevel}{" "}
              <span className="text-[10px] uppercase">XP</span>
            </span>
          </div>
          <div className="h-2 w-full bg-border/40 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 relative overflow-hidden ${badge.bg.replace("/10", "")}`}
              style={{ width: `${levelInfo.progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>

        {/* Level Progression Journey */}
        <RankJourney levelInfo={levelInfo} className="mt-6" />
      </div>
    </div>
  );
}
