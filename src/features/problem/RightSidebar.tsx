import { Trophy, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { ITopic } from "@/types/topics";
import type { IProblemList } from "@/types/problems";
import { useMemo } from "react";

interface RightSidebarProps {
    topics: ITopic[];
    selectedTopic: string;
    problems: IProblemList[];
}

interface DifficultyStats {
    total: number;
    solved: number;
    percent: number;
}

export default function RightSidebar({ topics, selectedTopic, problems }: RightSidebarProps) {

    const currentTopic = topics.find((topic) => topic.name === selectedTopic);

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

    return (
        <div className="space-y-6">
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

            {/* Streak Widget (Refined version) */}
            <div className="bg-linear-to-br from-orange-500 to-red-600 rounded-xl p-5 text-white shadow-md relative overflow-hidden">
                {/* Decorative background blob */}
                <div className="absolute -right-6 -bottom-6 opacity-30">
                    <Flame className="w-24 h-24" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-orange-100">Current Streak</p>
                        <p className="mt-1 text-3xl font-bold font-pj tracking-tight">5 Days</p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/10 shadow-sm">
                        <Flame className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className="relative z-10 mt-5 flex space-x-1.5">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 5 ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'bg-white/20'}`}></div>
                    ))}
                </div>
                <p className="relative z-10 mt-3 text-xs text-orange-50 font-medium">Keep it up! 2 more days for a weekly badge.</p>
            </div>
        </div>
    );
}
