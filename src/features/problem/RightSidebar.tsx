import { Trophy, Target, TrendingUp, Flame, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useProfile } from "@/hooks/useProfile";
import type { ITopic } from "@/types/topics";

interface RightSidebarProps {
    topics?: ITopic[];
}

export default function RightSidebar({ topics = [] }: RightSidebarProps) {
    const { data } = useProfile();
    const user = data?.data ?? data;

    const solved = user?.problemsSolved ?? 0;

    // Calculate total problems across all topics, defaulting to 150 if topics array is empty
    const totalSystemProblems = topics.length > 0
        ? topics.reduce((acc, topic) => acc + (topic.problemsCount || 0), 0)
        : 150;

    const progressPercent = totalSystemProblems > 0
        ? Math.min(100, Math.round((solved / totalSystemProblems) * 100))
        : 0;


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

                {/* Progress Bar */}
                <div className="mb-5 space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-foreground">Completion</span>
                        <span className="text-xs font-semibold text-muted-foreground">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2 w-full bg-secondary" />
                    <p className="text-xs text-muted-foreground">
                        {solved} of {totalSystemProblems} problems solved
                    </p>
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
