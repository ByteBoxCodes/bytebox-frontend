import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderProfileSkeleton() {
  return (
    <div className="flex items-center gap-3">
      {/* Streak button — exact same container classes as the real button */}
      <button
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-full"
        disabled
      >
        <div className="relative flex items-center justify-center">
          <Skeleton className="size-4 rounded-full" />
        </div>
        <Skeleton className="h-3.5 w-3 rounded-sm" />
      </button>

      {/* Profile dropdown trigger — exact same container classes as the real trigger */}
      <button
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-transparent"
        disabled
      >
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="hidden sm:flex flex-col items-start text-left gap-1">
          <Skeleton className="h-3.5 w-16 rounded-sm" />
          <Skeleton className="h-[11px] w-12 rounded-sm" />
        </div>
      </button>
    </div>
  );
}
