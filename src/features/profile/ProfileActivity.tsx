import { Flame, Zap, Trophy, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo } from "react";
import type { IUserStats, IHeatmapData } from "@/types/auth";

interface ProfileActivityProps {
    stats: IUserStats;
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
                label: firstDay.toLocaleString('default', { month: 'short' }),
                cells: monthDays
            });
        }
        return blocks;
    }, []);

    const getDayData = useMemo(() => {
        const pad = (n: number) => n.toString().padStart(2, '0');
        const heatmapMap = new Map(data.map(item => [item.date, item.count]));

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
                                <span className="text-[10px] sm:text-[11px] text-(--text-secondary) dark:text-(--dk-text-muted) h-[16px] sm:h-[18px] mb-[1px]">
                                    {month.label}
                                </span>
                                <div className={`grid grid-rows-7 grid-flow-col ${gapClass}`}>
                                    {month.cells.map((day, dIdx) => {
                                        if (!day) return <div key={`empty-${mIdx}-${dIdx}`} className={`${cellClass} invisible`} />;

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
                    <div className={`${cellClass} bg-black/5 dark:bg-white/5 border border-border/20`} />
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

export default function ProfileActivity({ stats }: ProfileActivityProps) {
    const activityStats: ActivityStatProps[] = [
        { label: "Current Streak", value: `${stats.currentStreak} days`, icon: Flame, color: "text-orange-500" },
        { label: "Longest Streak", value: `${stats.maxStreak} days`, icon: Zap, color: "text-yellow-500" },
        { label: "Submissions", value: stats.totalSubmissions, icon: Trophy, color: "text-blue-500" },
        { label: "Languages Used", value: stats.languages.length, icon: BookOpen, color: "text-purple-500" },
    ];

    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5 space-y-6">
            <div>
                <h2 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) mb-4 flex items-center gap-2">
                    <Flame size={15} className="text-orange-500" />
                    Activity
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activityStats.map((s) => (
                        <ActivityStat key={s.label} {...s} />
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) mb-3">
                    Submissions in {new Date().getFullYear()}
                </h3>
                <ContributionHeatmap data={stats.heatmap} />
            </div>
        </section>
    );
}
