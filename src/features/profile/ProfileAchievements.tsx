import { Medal, Star, Flame, Code2, Zap, Target } from "lucide-react";

export default function ProfileAchievements() {
    // Static achievements list as requested
    const achievements = [
        {
            id: 1,
            title: "First Blood",
            description: "Solved your first problem",
            icon: Target,
            locked: false,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: 2,
            title: "Array Master",
            description: "Completed the Arrays topic",
            icon: Code2,
            locked: false,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20"
        },
        {
            id: 3,
            title: "7-Day Streak",
            description: "Maintained a 7-day coding streak",
            icon: Flame,
            locked: false,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20"
        },
        {
            id: 4,
            title: "Speed Demon",
            description: "Solved an Easy problem in under 2 minutes",
            icon: Zap,
            locked: false,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            id: 5,
            title: "Algorithm Apprentice",
            description: "Reached Level 20",
            icon: Star,
            locked: true,
            color: "text-muted-foreground",
            bg: "bg-secondary",
            border: "border-border"
        },
        {
            id: 6,
            title: "ByteBox Champion",
            description: "Reached Level 50",
            icon: Medal,
            locked: true,
            color: "text-muted-foreground",
            bg: "bg-secondary",
            border: "border-border"
        },
    ];

    return (
        <div className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-(--text-primary) dark:text-(--dk-text)">
                    Achievements Showcase
                </h2>
                <span className="text-xs font-semibold px-2 py-1 rounded-md bg-primary/10 text-primary">
                    4 / 6 Unlocked
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((acc) => {
                    const Icon = acc.icon;
                    return (
                        <div
                            key={acc.id}
                            className={`relative flex items-center p-3 rounded-xl border ${acc.border} bg-(--bg-primary) dark:bg-zinc-900/50 transition-all ${acc.locked ? 'opacity-50 grayscale' : 'hover:scale-[1.02] cursor-pointer'}`}
                        >
                            <div className={`flex items-center justify-center p-3 rounded-lg mr-3 ${acc.bg}`}>
                                <Icon className={`w-6 h-6 ${acc.color}`} />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-(--text-primary) dark:text-white leading-tight">
                                    {acc.title}
                                </h4>
                                <p className="text-xs text-(--text-secondary) dark:text-(--dk-text-muted) mt-1 font-medium">
                                    {acc.locked ? "Locked" : acc.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
