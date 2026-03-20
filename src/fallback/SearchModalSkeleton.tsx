import { Skeleton } from "@/components/ui/skeleton";

export default function SearchModalSkeleton() {
    return (
        <div className="py-3 px-2 space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 rounded-md"
                >
                    <div className="flex flex-col gap-1.5 max-w-[80%]">
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-5 w-14 rounded" />
                </div>
            ))}
        </div>
    );
}
