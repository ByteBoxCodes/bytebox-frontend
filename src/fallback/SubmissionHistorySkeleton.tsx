import { Skeleton } from "@/components/ui/skeleton";

export default function SubmissionHistorySkeleton() {
    return (
        <div className="h-full">
            {/* Table header */}
            <div className="flex items-center gap-4 px-5 py-2.5 border-b border-(--border-primary) dark:border-(--dk-border)">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-12" />
                <div className="flex-1" />
                <Skeleton className="h-3 w-16" />
            </div>

            {/* Skeleton rows */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 px-5 py-3.5 border-b border-(--border-primary) dark:border-(--dk-border)"
                >
                    {/* Status */}
                    <div className="flex items-center gap-2 min-w-[160px]">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                    </div>

                    {/* Language badge */}
                    <Skeleton className="h-5 w-12 rounded" />

                    {/* Test cases */}
                    <div className="flex items-center gap-1.5 min-w-[100px]">
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-3 w-10" />
                    </div>

                    <div className="flex-1" />

                    {/* Timestamp */}
                    <Skeleton className="h-3 w-16" />
                </div>
            ))}
        </div>
    );
}
