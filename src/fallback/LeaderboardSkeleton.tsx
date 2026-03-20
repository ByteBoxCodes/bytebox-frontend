import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function LeaderboardTableSkeleton() {
  return (
    <Table>
      <TableHeader className="bg-transparent border-b border-border">
        <TableRow className="hover:bg-transparent border-0 [&_th]:h-10">
          <TableHead className="w-[80px] text-center">
            <Skeleton className="h-3.5 w-8 mx-auto" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-3.5 w-8" />
          </TableHead>
          <TableHead className="w-[120px] text-right">
            <Skeleton className="h-3.5 w-12 ml-auto" />
          </TableHead>
          <TableHead className="w-[120px] text-right">
            <Skeleton className="h-3.5 w-6 ml-auto" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 8 }).map((_, i) => (
          <TableRow
            key={i}
            className={`border-0 ${i % 2 !== 0 ? "bg-muted/50" : "bg-(--bg-secondary)"}`}
          >
            <TableCell className="text-center py-3">
              <Skeleton className="h-5 w-5 rounded-full mx-auto" />
            </TableCell>
            <TableCell className="py-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>
            </TableCell>
            <TableCell className="py-3 text-right">
              <Skeleton className="h-4 w-8 ml-auto" />
            </TableCell>
            <TableCell className="py-3 text-right">
              <Skeleton className="h-4 w-14 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function RightSidebarSkeleton() {
  return (
    <div className="space-y-6 sticky top-8">
      {/* Rank Widget */}
      <div className="pb-5 border-b border-border">
        <div className="flex items-center mb-4">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="ml-3 space-y-1">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        <div className="mb-5 space-y-2">
          <div className="flex justify-between items-end">
            <Skeleton className="h-3.5 w-14" />
            <Skeleton className="h-3 w-6" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-3 w-32 ml-auto" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-3 w-6" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-6" />
          </div>
        </div>
      </div>

      {/* Streak Widget */}
      <div className="rounded-xl p-5 bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-12 w-12 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardSkeleton() {
  return (
    <div
      className="relative h-full flex flex-col overflow-hidden transition-colors duration-200
                    bg-(--bg-secondary) border-t border-(--border-primary)
                    dark:border-(--dk-border)"
    >
      <div className="relative z-10 px-4 w-full sm:px-6 lg:px-6 py-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 max-w-7xl mx-auto w-full">
          {/* Left Content */}
          <div
            className="flex-1 space-y-6 lg:px-8 min-h-[calc(100vh-12rem)] min-w-0
                        lg:border-r border-(--border-primary) dark:border-(--dk-border)"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="pb-4">
                <div className="flex items-center gap-2 justify-between pb-2">
                  <Skeleton className="h-8 w-56" />
                </div>
                <div className="mt-2 space-y-1.5">
                  <Skeleton className="h-3.5 w-96 max-w-full" />
                </div>
              </div>

              {/* Table */}
              <div className="rounded-lg border-y border-border overflow-hidden">
                <LeaderboardTableSkeleton />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="shrink-0 w-full lg:w-[26%] space-y-6 lg:pl-8">
            <RightSidebarSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
