import { Flame, Zap, Trophy, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo } from "react";

interface ProfileActivityProps {
    attempted: number; // from API — the rest are static for now
}

interface ActivityStatProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
}

function ActivityStat({ label, value, icon: Icon, color }: ActivityStatProps) {
    return (
        <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-(--bg-secondary) dark:bg-(--dk-surface) border border-border/40`}>
                <Icon size={18} className={color} />
            </div>
            <div>
                <p className="text-sm font-bold text-(--text-primary) dark:text-(--dk-text)">{value}</p>
                <p className="text-[11px] text-(--text-secondary) dark:text-(--dk-text-muted) leading-tight">{label}</p>
            </div>
        </div>
    );
}

function ContributionHeatmap() {
    const { empties, days, months } = useMemo(() => {
        const today = new Date();
        const start = new Date(today);
        start.setDate(today.getDate() - 364);

        const offset = start.getDay();
        const empties = Array.from({ length: offset });

        const days = Array.from({ length: 365 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d;
        });

        const months: { label: string; colIndex: number }[] = [];
        let prevMonth = -1;
        days.forEach((day, i) => {
            const colIndex = Math.floor((i + offset) / 7);
            const month = day.getMonth();
            if (month !== prevMonth) {
                const lastAdded = months[months.length - 1];
                if (!lastAdded || colIndex - lastAdded.colIndex > 2) {
                    months.push({ label: day.toLocaleString('default', { month: 'short' }), colIndex });
                }
                prevMonth = month;
            }
        });

        return { empties, days, months };
    }, []);

    // Random data for demo purposes
    // We memoize it so it doesn't blink on every re-render
    const intensities = useMemo(() => {
        return days.map(() => Math.random() > 0.75 ? Math.floor(Math.random() * 4) + 1 : 0);
    }, [days]);

    return (
        <div className="w-full">
            <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <div className="min-w-max pr-4">
                    {/* Months */}
                    <div className="flex relative h-6 text-xs text-(--text-secondary) dark:text-(--dk-text-muted)">
                        {months.map((m, i) => (
                            <span key={i} className="absolute" style={{ left: `${m.colIndex * 15 + 30}px`, bottom: 4 }}>
                                {m.label}
                            </span>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="flex gap-2.5">
                        {/* Day labels (Mon, Wed, Fri) */}
                        <div className="flex flex-col justify-between text-[10px] text-(--text-secondary) dark:text-(--dk-text-muted) py-[2px] w-[20px] text-right">
                            <span className="invisible">Sun</span>
                            <span>Mon</span>
                            <span className="invisible">Tue</span>
                            <span>Wed</span>
                            <span className="invisible">Thu</span>
                            <span>Fri</span>
                            <span className="invisible">Sat</span>
                        </div>

                        {/* Heatmap cells */}
                        <div className="grid grid-rows-7 grid-flow-col gap-[3px]">
                            {empties.map((_, i) => (
                                <div key={`empty-${i}`} className="w-[11px] h-[11px]" />
                            ))}
                            {days.map((day, i) => {
                                const intensity = intensities[i];
                                const colors = [
                                    "bg-black/5 dark:bg-white/5", // 0
                                    "bg-emerald-200/60 dark:bg-emerald-900/60", // 1
                                    "bg-emerald-300 dark:bg-emerald-700", // 2
                                    "bg-emerald-400 dark:bg-emerald-500", // 3
                                    "bg-emerald-500 dark:bg-emerald-400", // 4
                                ];
                                const count = intensity > 0 ? (intensity * 2) : 0;
                                return (
                                    <div
                                        key={day.toISOString()}
                                        className={`w-[11px] h-[11px] rounded-[2px] ${colors[intensity]} transition-all hover:ring-1 hover:ring-foreground/50`}
                                        title={`${count} submissions on ${day.toDateString()}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 text-xs text-(--text-secondary) dark:text-(--dk-text-muted) mt-2">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-[12px] h-[12px] rounded-[3px] bg-black/5 dark:bg-white/5" />
                    <div className="w-[12px] h-[12px] rounded-[3px] bg-emerald-200/60 dark:bg-emerald-900/60" />
                    <div className="w-[12px] h-[12px] rounded-[3px] bg-emerald-300 dark:bg-emerald-700" />
                    <div className="w-[12px] h-[12px] rounded-[3px] bg-emerald-400 dark:bg-emerald-500" />
                    <div className="w-[12px] h-[12px] rounded-[3px] bg-emerald-500 dark:bg-emerald-400" />
                </div>
                <span>More</span>
            </div>
        </div>
    );
}

export default function ProfileActivity({ attempted }: ProfileActivityProps) {
    const stats: ActivityStatProps[] = [
        { label: "Current Streak", value: "12 days", icon: Flame, color: "text-orange-500" },
        { label: "Longest Streak", value: "34 days", icon: Zap, color: "text-yellow-500" },
        { label: "Submissions", value: attempted, icon: Trophy, color: "text-blue-500" },
        { label: "Courses Done", value: "3", icon: BookOpen, color: "text-purple-500" },
    ];

    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5 space-y-6">
            <div>
                <h2 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) mb-4 flex items-center gap-2">
                    <Flame size={15} className="text-orange-500" />
                    Activity
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {stats.map((s) => (
                        <ActivityStat key={s.label} {...s} />
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) mb-3">
                    Submissions in the past year
                </h3>
                <ContributionHeatmap />
            </div>
        </section>
    );
}
