import { CheckCircle2 } from "lucide-react";
import type { IUserProfile, IUserStats } from "@/types/auth";
import RankBadge from "@/components/common/RankBadge";
import { REWARD_MAP } from "@/constants/rewards";

interface ProfileSolvedStatsProps {
  stats: IUserStats;
  user: IUserProfile;
}

interface DifficultyRowProps {
  label: string;
  solved: number;
  total: number;
  barColor: string;
  textColor: string;
}

function DifficultyRow({
  label,
  solved,
  total,
  barColor,
  textColor,
}: DifficultyRowProps) {
  const pct = total > 0 ? (solved / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className={`text-xs font-semibold w-14 shrink-0 ${textColor}`}>
        {label}
      </span>
      <div className="flex-1 h-2 rounded-full bg-border/40 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-(--text-secondary) dark:text-(--dk-text-muted) w-14 text-right shrink-0">
        {solved}/{total}
      </span>
    </div>
  );
}

export default function ProfileSolvedStats({
  stats,
  user,
}: ProfileSolvedStatsProps) {
  const {
    totalSolvedProblems: solved,
    totalSubmissions: attempted,
    easySolved,
    mediumSolved,
    hardSolved,
    totalEasy,
    totalMedium,
    totalHard,
    acceptanceRate,
    totalProblems,
  } = stats;

  const rate = Math.round(acceptanceRate);

  const activeTitleConfig = user.activeTitle ? REWARD_MAP[user.activeTitle] : null;
  const TitleComponent = activeTitleConfig?.icon as React.ElementType;

  return (
    <section className="relative rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-4 sm:p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) flex items-center gap-2">
          <CheckCircle2 size={15} className="text-emerald-500" />
          Problems Solved
        </h2>
        {/* Dynamic Rank badge & PRO badge */}
        <div className="flex items-center gap-2">
          {TitleComponent ? (
            <TitleComponent className="origin-right scale-90" />
          ) : (
            <RankBadge
              points={user.points}
              level={user.level}
              levelXp={user.levelXp}
              variant="pill"
            />
          )}
          {(user?.premium || user?.isPremiumUser) && (
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-linear-to-r from-amber-500 to-orange-500 text-white shrink-0  shadow-md shadow-orange-500/20 leading-none">
              PRO
            </span>
          )}
        </div>
      </div>

      {/* Summary row */}
      <div className="flex flex-wrap items-end gap-5 mb-5">
        <div>
          <p className="text-4xl font-extrabold text-(--text-primary) dark:text-(--dk-text) leading-none">
            {solved}
          </p>
          <p className="text-xs text-(--text-secondary) dark:text-(--dk-text-muted) mt-1">
            solved out of{" "}
            <span className="font-semibold text-(--text-primary) dark:text-(--dk-text)">
              {totalProblems || 0}
            </span>
          </p>
        </div>
        <div className="flex gap-4 ml-auto text-center">
          <div>
            <p className="text-lg font-bold text-emerald-500">{easySolved}</p>
            <p className="text-xs text-(--text-secondary) dark:text-(--dk-text-muted)">
              Easy
            </p>
          </div>
          <div>
            <p className="text-lg font-bold text-amber-500">{mediumSolved}</p>
            <p className="text-xs text-(--text-secondary) dark:text-(--dk-text-muted)">
              Medium
            </p>
          </div>
          <div>
            <p className="text-lg font-bold text-red-500">{hardSolved}</p>
            <p className="text-xs text-(--text-secondary) dark:text-(--dk-text-muted)">
              Hard
            </p>
          </div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="space-y-2.5">
        <DifficultyRow
          label="Easy"
          solved={easySolved}
          total={totalEasy}
          barColor="bg-emerald-500"
          textColor="text-emerald-500"
        />
        <DifficultyRow
          label="Medium"
          solved={mediumSolved}
          total={totalMedium}
          barColor="bg-amber-500"
          textColor="text-amber-500"
        />
        <DifficultyRow
          label="Hard"
          solved={hardSolved}
          total={totalHard}
          barColor="bg-red-500"
          textColor="text-red-500"
        />
      </div>

      <p className="text-xs text-(--text-secondary) dark:text-(--dk-text-muted) mt-4">
        Acceptance rate:{" "}
        <span className="font-semibold text-(--text-primary) dark:text-(--dk-text)">
          {rate}%
        </span>{" "}
        · Attempted:{" "}
        <span className="font-semibold text-(--text-primary) dark:text-(--dk-text)">
          {attempted}
        </span>
      </p>
    </section>
  );
}
