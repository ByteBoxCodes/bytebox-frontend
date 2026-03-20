import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSubmissionsSkeleton() {
    return (
        <div className="space-y-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0 px-2 -mx-2"
                >
                    <div className="flex items-center gap-2 min-w-0">
                        <Skeleton className="h-3.5 w-3.5 shrink-0" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                        <Skeleton className="h-3 w-12 hidden sm:block" />
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-10" />
                    </div>
                </div>
            ))}
        </div>
    );
}
