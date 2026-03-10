import { Trophy, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { ITopic } from "@/types/topics";
import type { IProblemList } from "@/types/problems";
import { useMemo } from "react";
import { getLevelInfo } from "@/utils/levelUtils";

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

    // Using static data for now as requested
    const staticPoints = 1250;
    const levelInfo = getLevelInfo(staticPoints);

    return (
        <div className="space-y-6">
            {/* Level Progress Widget */}
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5 shadow-sm group">
                {/* Decorative background accent */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full transition-all duration-500 group-hover:bg-primary/20" />

                <div className="relative z-10 flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3.5">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl border border-primary/20 shadow-inner">
                            <Trophy className="w-5 h-5 fill-primary/20" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted) mb-0.5">Current Rank</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-extrabold text-(--text-primary) dark:text-(--dk-text) tracking-tight leading-none">Level {levelInfo.level}</span>
                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                                    {levelInfo.title}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                        <span className="text-primary tracking-tight">{levelInfo.currentPoints} <span className="text-[10px] uppercase">XP</span></span>
                        <span className="text-(--text-secondary) dark:text-(--dk-text-muted) tracking-tight">{levelInfo.pointsForNextLevel} <span className="text-[10px] uppercase">XP</span></span>
                    </div>
                    <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden border border-border/50">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-1000 relative overflow-hidden"
                            style={{ width: `${levelInfo.progressPercent}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]" />
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-5 bg-(--bg-primary) dark:bg-zinc-900/50 rounded-xl p-3 border border-border/50 flex items-center gap-3">
                    <div className="bg-amber-500/10 p-1.5 rounded-lg text-amber-500 border border-amber-500/20 shrink-0">
                        <Zap className="w-4 h-4 fill-amber-500/20" />
                    </div>
                    <p className="text-[11px] text-(--text-secondary) dark:text-(--dk-text-muted) font-medium leading-tight">
                        <strong className="text-(--text-primary) dark:text-(--dk-text) block mb-0.5">Bonus Action</strong>
                        Complete all topic questions to earn <span className="text-amber-500 dark:text-amber-400 font-bold">+50 XP</span>
                    </p>
                </div>
            </div>
            {/* Stats Widget */}
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

        </div>
    );
}
