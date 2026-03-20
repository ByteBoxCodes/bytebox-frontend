import { Skeleton } from "@/components/ui/skeleton";

function SidebarSkeleton() {
    return (
        <aside className="w-full lg:w-72 lg:shrink-0 space-y-5 rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            {/* Avatar + Info */}
            <div className="flex items-center gap-4 pt-2 pl-2">
                <Skeleton className="h-[72px] w-[72px] rounded-full shrink-0" />
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-20" />
                    <div className="space-y-1.5 mt-1">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-1.5 w-[140px] rounded-full" />
                    </div>
                </div>
            </div>

            {/* Bio */}
            <div className="space-y-1.5 px-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-4/5" />
            </div>

            {/* Social icons */}
            <div className="flex justify-center gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-lg" />
                ))}
            </div>

            {/* Edit Profile button */}
            <Skeleton className="h-9 w-full rounded-md" />

            <hr className="border-border/40" />

            {/* Rank Journey */}
            <div className="space-y-3 px-1">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                ))}
            </div>

            <hr className="border-border/40" />

            {/* Meta info */}
            <div className="space-y-2.5 px-1">
                <div className="flex items-center gap-2.5">
                    <Skeleton className="h-3.5 w-3.5" />
                    <Skeleton className="h-3 w-32" />
                </div>
                <div className="flex items-center gap-2.5">
                    <Skeleton className="h-3.5 w-3.5" />
                    <Skeleton className="h-3 w-28" />
                </div>
            </div>

            <hr className="border-border/40" />

            {/* Preferred Language */}
            <div className="px-1 space-y-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-4 w-20" />
            </div>

            <hr className="border-border/40" />

            {/* Skills */}
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
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-28" />
            </div>

            <div className="flex items-end gap-5 mb-5">
                <div>
                    <Skeleton className="h-10 w-14" />
                    <Skeleton className="h-3 w-28 mt-1" />
                </div>
                <div className="flex gap-4 ml-auto">
                    {["Easy", "Medium", "Hard"].map((label) => (
                        <div key={label} className="text-center space-y-1">
                            <Skeleton className="h-5 w-6 mx-auto" />
                            <Skeleton className="h-3 w-10 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2.5">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-3 w-14" />
                        <Skeleton className="h-2 flex-1 rounded-full" />
                        <Skeleton className="h-3 w-10" />
                    </div>
                ))}
            </div>

            <Skeleton className="h-3 w-48 mt-4" />
        </section>
    );
}

function ActivitySkeleton() {
    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5 space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-xl" />
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-14" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Heatmap placeholder */}
            <div className="mt-8">
                <Skeleton className="h-4 w-40 mb-3" />
                <Skeleton className="h-24 w-full rounded-lg" />
            </div>
        </section>
    );
}

function SubmissionsSkeleton() {
    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3.5 w-3.5" />
                        <Skeleton className="h-4 w-36" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-3 w-16" />
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
