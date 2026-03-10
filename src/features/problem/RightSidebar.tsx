import { Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { ITopic } from "@/types/topics";
import type { IProblemList } from "@/types/problems";
import { useMemo } from "react";
import { getLevelInfo } from "@/utils/levelUtils";
import { useProfile } from "@/hooks/useProfile";
import { BADGES } from "@/constants/badges";

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

export default function RightSidebar({ topics, selectedTopicId, problems }: RightSidebarProps) {

    const { data: userProfile } = useProfile();
    const user = userProfile?.data;
    const points = user?.points ?? 0;
    const levelInfo = getLevelInfo(points, user?.level);

    const currentTopic = topics.find((topic) => topic.id === selectedTopicId);

    const solved = currentTopic?.solvedProblems || 0;
    const totalSystemProblems = currentTopic?.totalProblems || 0;

    const progressPercent = totalSystemProblems > 0
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
            stats[key].percent = stats[key].total > 0
                ? Math.min(100, Math.round((stats[key].solved / stats[key].total) * 100))
                : 0;
        }

        return stats;
    }, [problems]);

    const difficultyConfig = [
        { key: "EASY", label: "Easy", color: "bg-emerald-500", textColor: "text-emerald-500", trackColor: "bg-emerald-500/15" },
        { key: "MEDIUM", label: "Medium", color: "bg-amber-500", textColor: "text-amber-500", trackColor: "bg-amber-500/15" },
        { key: "HARD", label: "Hard", color: "bg-red-500", textColor: "text-red-500", trackColor: "bg-red-500/15" },
    ];

    const currentBadge = [...BADGES].reverse().find(b => levelInfo.level >= b.req) || BADGES[0];
    const BadgeIcon = currentBadge.icon;

    return (
        <div className="space-y-6">

            {/* Stats Widget (Moved to Top) */}
            <div className="pb-5 border-b border-border">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Trophy className="w-5 h-5" />
                    </div>
                    <h3 className="ml-3 text-lg font-bold text-foreground font-pj tracking-tight">Your Progress</h3>
                </div>

                {/* Overall Progress Bar */}
                <div className="mb-5 space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-foreground">Overall</span>
                        <span className="text-xs font-semibold text-muted-foreground">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2 w-full bg-secondary" />
                    <p className="text-xs text-muted-foreground">
                        {solved} of {totalSystemProblems} problems solved
                    </p>
                </div>

                {/* Difficulty Breakdown */}
                <div className="space-y-3">
                    {difficultyConfig.map(({ key, label, color, textColor, trackColor }) => {
                        const stats = difficultyBreakdown[key];
                        return (
                            <div key={key} className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <span className={`text-xs font-semibold ${textColor}`}>{label}</span>
                                    <span className="text-xs text-muted-foreground font-medium">
                                        {stats.solved}/{stats.total}
                                    </span>
                                </div>
                                <div className={`h-1.5 w-full rounded-full overflow-hidden ${trackColor}`}>
                                    <div
                                        className={`h-full rounded-full ${color} transition-all duration-500 ease-out`}
                                        style={{ width: `${stats.percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Level Progress Widget (Moved to Bottom) */}
            <div className="relative overflow-hidden w-full">
                <div className="relative z-10 flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl border shadow-inner ${currentBadge.bg} ${currentBadge.border} ${currentBadge.color}`}>
                            <BadgeIcon className={`w-5 h-5 ${currentBadge.fill}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted) mb-0.5">Current Rank</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-extrabold text-(--text-primary) dark:text-(--dk-text) tracking-tight leading-none">Level {levelInfo.level}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentBadge.color} ${currentBadge.bg} ${currentBadge.border}`}>
                                    {currentBadge.title}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                        <span className={`tracking-tight ${currentBadge.color}`}>{points} <span className="text-[10px] uppercase">XP</span></span>
                        <span className="text-(--text-secondary) dark:text-(--dk-text-muted) tracking-tight">{levelInfo.level * 15} <span className="text-[10px] uppercase">XP</span></span>
                    </div>
                    <div className="h-2 w-full bg-border/40 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 relative overflow-hidden ${currentBadge.bg.replace('/10', '')}`}
                            style={{ width: `${Math.min(100, Math.max(0, points < (levelInfo.level * 15) ? (points / (levelInfo.level * 15)) * 100 : 100))}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]" />
                        </div>
                    </div>
                </div>

                {/* Level Progression Journey */}
                <div className="px-1 mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted)">
                            Rank Journey
                        </p>
                    </div>

                    <div className="relative pt-1 pb-1">
                        {/* Progress Background Line */}
                        <div className="absolute top-5 left-5 right-5 h-1.5 bg-border/40 rounded-full overflow-hidden">
                            {/* Active Progress Line */}
                            <div
                                className="h-full bg-linear-to-r from-emerald-500 via-purple-500 to-amber-500 transition-all duration-1000 relative"
                                style={{
                                    width: `${Math.min(100, Math.max(0,
                                        levelInfo.level < 15 ? ((levelInfo.level - 1) / 14) * 25 :
                                            levelInfo.level < 30 ? 25 + ((levelInfo.level - 15) / 15) * 25 :
                                                levelInfo.level < 40 ? 50 + ((levelInfo.level - 30) / 10) * 25 :
                                                    levelInfo.level < 50 ? 75 + ((levelInfo.level - 40) / 10) * 25 : 100
                                    ))}%`
                                }}
                            >
                                <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite]" />
                            </div>
                        </div>

                        <div className="relative flex justify-between">
                            {BADGES.map((badge, idx) => {
                                const isUnlocked = levelInfo.level >= badge.req;
                                const isCurrent = levelInfo.level >= badge.req && (idx === 4 || levelInfo.level < BADGES[idx + 1].req);
                                const Icon = badge.icon;

                                return (
                                    <div key={badge.req} className="flex flex-col items-center group relative w-10 cursor-default">
                                        {/* Tooltip */}
                                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-zinc-700 text-white text-[10px] font-bold px-2 py-1.5 rounded-md shadow-xl whitespace-nowrap z-20 pointer-events-none">
                                            Unlocks at LVL {badge.req}
                                        </div>

                                        <div
                                            className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-transform duration-300 bg-(--bg-primary)
                                            ${isUnlocked ? `${badge.border} ${badge.color}` : 'border-border/60 text-(--text-tertiary) dark:text-(--dk-text-muted)/40 bg-secondary/50'}
                                            ${isCurrent ? 'scale-125 bg-(--bg-secondary) z-20 border-opacity-100' : 'hover:scale-110'}
                                        `}
                                        >
                                            <Icon size={isCurrent ? 14 : 12} className={isUnlocked && isCurrent ? "animate-pulse" : ""} />
                                        </div>
                                        <span className={`mt-2.5 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-tighter sm:tracking-tighter transition-colors ${isUnlocked ? 'text-(--text-primary) dark:text-(--dk-text)' : 'text-(--text-tertiary) dark:text-(--dk-text-muted)/40'}`}>
                                            {badge.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
