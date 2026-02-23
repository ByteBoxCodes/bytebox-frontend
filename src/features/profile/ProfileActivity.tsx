import { Flame, Zap, Trophy, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ProfileActivityProps {
    attempted: number; // from API — the rest are static for now
}

interface ActivityStatProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    bg: string;
}

function ActivityStat({ label, value, icon: Icon, color, bg }: ActivityStatProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl
                        border border-border/40 bg-(--bg-primary) dark:bg-zinc-900 p-4 text-center">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${bg}`}>
                <Icon size={16} className={color} />
            </div>
            <p className="text-xl font-bold text-(--text-primary) dark:text-(--dk-text)">{value}</p>
            <p className="text-[11px] text-(--text-secondary) dark:text-(--dk-text-muted) leading-tight">{label}</p>
        </div>
    );
}

export default function ProfileActivity({ attempted }: ProfileActivityProps) {
    const stats: ActivityStatProps[] = [
        { label: "Current Streak", value: "12 days", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" }, // static
        { label: "Longest Streak", value: "34 days", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" }, // static
        { label: "Submissions", value: attempted, icon: Trophy, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Courses Done", value: "3", icon: BookOpen, color: "text-purple-500", bg: "bg-purple-500/10" }, // static
    ];

    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            <h2 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) mb-4 flex items-center gap-2">
                <Flame size={15} className="text-orange-500" />
                Activity Overview
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s) => (
                    <ActivityStat key={s.label} {...s} />
                ))}
            </div>
        </section>
    );
}
