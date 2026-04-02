import { BADGES } from "@/constants/badges";

interface RankJourneyProps {
    levelInfo: {
        level: number;
    };
    className?: string;
}

export function RankJourney({ levelInfo, className = "" }: RankJourneyProps) {
    return (
        <div className={`px-1 ${className}`}>
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
                                levelInfo.level < 15 ? ((levelInfo.level - 1) / 14) * 33.33 :
                                    levelInfo.level < 30 ? 33.33 + ((levelInfo.level - 15) / 15) * 33.33 :
                                        levelInfo.level < 50 ? 66.66 + ((levelInfo.level - 30) / 20) * 33.34 : 100
                            ))}%`
                        }}
                    >
                        <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite]" />
                    </div>
                </div>

                <div className="relative flex justify-between">
                    {BADGES.map((badge, idx) => {
                        const isUnlocked = levelInfo.level >= badge.req;
                        const isCurrent = levelInfo.level >= badge.req && (idx === BADGES.length - 1 || levelInfo.level < BADGES[idx + 1].req);
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
                                <span className={`text-[7px] sm:text-[8px] font-semibold mt-0.5 ${isUnlocked ? badge.color : 'text-(--text-tertiary) dark:text-(--dk-text-muted)/50'}`}>
                                    Lvl {badge.req}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
