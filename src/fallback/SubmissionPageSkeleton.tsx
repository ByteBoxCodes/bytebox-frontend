import { Skeleton } from "@/components/ui/skeleton";

export default function SubmissionPageSkeleton() {
    return (
        <div className="relative h-[calc(100vh-4rem)] w-full flex bg-(--bg-secondary) overflow-hidden">
            {/* Left Panel — Question Skeleton */}
            <div className="flex-1 h-full p-6 space-y-6 border-r border-(--border-primary) dark:border-(--dk-border) overflow-hidden">
                {/* Title + Tags */}
                <div className="space-y-3">
                    <Skeleton className="h-7 w-3/5" />
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                </div>

                {/* Description paragraphs */}
                <div className="space-y-2.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Example block */}
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                </div>

                {/* Constraints */}
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-3/5" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>

            {/* Right Panel — Editor Skeleton */}
            <div className="flex-1 h-full flex flex-col overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-(--border-primary) dark:border-(--dk-border)">
                    <Skeleton className="h-8 w-28 rounded-md" />
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-20 rounded-md" />
                        <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                </div>

                {/* Code area */}
                <div className="flex-1 p-4 space-y-2">
                    {Array.from({ length: 14 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="h-4"
                            style={{ width: `${Math.max(20, Math.random() * 80)}%` }}
                        />
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-(--border-primary) dark:border-(--dk-border)">
                    <Skeleton className="h-9 w-24 rounded-md" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>
            </div>
        </div>
    );
}
