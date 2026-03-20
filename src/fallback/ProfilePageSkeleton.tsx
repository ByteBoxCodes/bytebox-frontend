import { Skeleton } from "@/components/ui/skeleton";

function SidebarSkeleton() {
    return (
        <aside className="w-full lg:w-72 lg:shrink-0 space-y-5 rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            {/* Avatar + Info — matches ProfileSidebar layout */}
            <div className="flex items-center gap-4 pt-2 pl-2">
                {/* Avatar 72x72 with progress ring 88x88 */}
                <div className="relative shrink-0 flex items-center justify-center">
                    <Skeleton className="h-[72px] w-[72px] rounded-full" />
                </div>
                <div className="flex flex-col min-w-0 flex-1 justify-center">
                    {/* Name: text-lg font-bold */}
                    <Skeleton className="h-[18px] w-32" />
                    {/* Username: text-xs mt-0.5 */}
                    <Skeleton className="h-3 w-20 mt-1.5" />
                    {/* Level + Points: mt-2.5 */}
                    <div className="mt-2.5 flex flex-col gap-1.5 w-full">
                        <div className="flex items-center justify-between w-full max-w-[140px]">
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-3 w-3" />
                                <Skeleton className="h-3 w-14" />
                            </div>
                            <Skeleton className="h-[10px] w-12" />
                        </div>
                        {/* Progress bar: h-1.5 max-w-[140px] */}
                        <Skeleton className="h-1.5 w-[140px] rounded-full" />
                    </div>
                </div>
            </div>

            {/* Bio: text-sm text-center px-2 */}
            <div className="px-2 space-y-1.5">
                <Skeleton className="h-3.5 w-full mx-auto" />
                <Skeleton className="h-3.5 w-4/5 mx-auto" />
            </div>

            {/* Social icons: h-8 w-8 rounded-lg each */}
            <div className="flex justify-center gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-lg" />
                ))}
            </div>

            {/* Edit Profile button: h-9 w-full */}
            <Skeleton className="h-9 w-full rounded-md" />

            <hr className="border-border/40" />

            {/* Rank Journey: h-6 w-6 circles + text */}
            <div className="space-y-3 px-1">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                ))}
            </div>

            <hr className="border-border/40" />

            {/* Meta info: icon 14px + text-xs */}
            <div className="space-y-2.5 px-1">
                <div className="flex items-center gap-2.5">
                    <Skeleton className="h-3.5 w-3.5 shrink-0" />
                    <Skeleton className="h-3 w-32" />
                </div>
                <div className="flex items-center gap-2.5">
                    <Skeleton className="h-3.5 w-3.5 shrink-0" />
                    <Skeleton className="h-3 w-28" />
                </div>
            </div>

            <hr className="border-border/40" />

            {/* Preferred Language: text-xs uppercase label + icon + text */}
            <div className="px-1 space-y-2">
                <Skeleton className="h-3 w-32" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5 shrink-0" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>

            <hr className="border-border/40" />

            {/* Community: Coming Soon dashed block */}
            <div className="px-1 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-24 w-full rounded-xl" />
            </div>

            <hr className="border-border/40" />

            {/* Skills: text-xs label + badge pills */}
            <div className="px-1 space-y-2">
                <Skeleton className="h-3 w-24" />
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                </div>
            </div>
        </aside>
    );
}

function SolvedStatsSkeleton() {
    return (
        <section className="relative rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            {/* Rank badge top-right */}
            <Skeleton className="absolute top-5 right-5 h-6 w-20 rounded-full" />

            {/* Header: icon 15px + text-sm font-semibold */}
            <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-[15px] w-[15px] rounded-full" />
                <Skeleton className="h-3.5 w-28" />
            </div>

            {/* Summary row: text-4xl number + Easy/Medium/Hard */}
            <div className="flex items-end gap-5 mb-5">
                <div>
                    <Skeleton className="h-10 w-12" />
                    <Skeleton className="h-3 w-32 mt-1" />
                </div>
                <div className="flex gap-4 ml-auto text-center">
                    {["w-6", "w-8", "w-6"].map((w, i) => (
                        <div key={i} className="space-y-1">
                            {/* text-lg font-bold number */}
                            <Skeleton className={`h-5 ${w} mx-auto`} />
                            {/* text-xs label */}
                            <Skeleton className="h-3 w-10 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Difficulty progress bars: label w-14 + h-2 bar + count w-14 */}
            <div className="space-y-2.5">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-3 w-14 shrink-0" />
                        <Skeleton className="h-2 flex-1 rounded-full" />
                        <Skeleton className="h-3 w-10 shrink-0" />
                    </div>
                ))}
            </div>

            {/* Acceptance rate text-xs */}
            <Skeleton className="h-3 w-52 mt-4" />
        </section>
    );
}

function ActivitySkeleton() {
    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5 space-y-6">
            {/* Header: icon 15px + text-sm */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-[15px] w-[15px] rounded-full" />
                    <Skeleton className="h-3.5 w-14" />
                </div>
                {/* 4-stat grid: h-10 w-10 icon box + text */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                            <div className="space-y-1">
                                {/* text-sm font-bold value */}
                                <Skeleton className="h-3.5 w-14" />
                                {/* text-[11px] label */}
                                <Skeleton className="h-[11px] w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Heatmap section */}
            <div className="mt-8">
                <Skeleton className="h-3.5 w-40 mb-3" />
                <Skeleton className="h-28 w-full rounded-lg" />
                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-3">
                    <Skeleton className="h-3 w-8" />
                    <div className="flex gap-[3px]">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="w-[11px] h-[11px] rounded-[2px]" />
                        ))}
                    </div>
                    <Skeleton className="h-3 w-8" />
                </div>
            </div>
        </section>
    );
}

function SubmissionsSkeleton() {
    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            {/* Header: icon + text-sm */}
            <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-3.5 w-32" />
            </div>
            {/* Submission rows */}
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3.5 w-3.5" />
                        <Skeleton className="h-4 w-36" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-14" />
                        <Skeleton className="h-3 w-10" />
                    </div>
                </div>
            ))}
        </section>
    );
}

export default function ProfilePageSkeleton() {
    return (
        <div className="min-h-screen bg-(--bg-primary) dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <SidebarSkeleton />
                    <div className="flex-1 min-w-0 space-y-5">
                        <SolvedStatsSkeleton />
                        <ActivitySkeleton />
                        <SubmissionsSkeleton />
                    </div>
                </div>
            </div>
        </div>
    );
}
