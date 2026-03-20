import { Skeleton } from "@/components/ui/skeleton";

function TopicSidebarSkeleton() {
  return (
    <div className="h-[calc(100vh-12rem)] sticky top-0 flex flex-col overflow-hidden">
      {/* My Lists Section — matches: mb-3 border-b pb-2 */}
      <div className="mb-3 border-b border-(--dk-border) pb-2 shrink-0">
        <div className="flex justify-between items-center mb-3 px-3">
          {/* "My Lists" label: text-xs font-extrabold uppercase tracking-wider */}
          <Skeleton className="h-3 w-14" />
          {/* Plus icon: w-[16px] h-[16px] */}
          <Skeleton className="h-4 w-4" />
        </div>
        <div className="space-y-1 px-2">
          {/* Favorites button: px-3 py-2, icon p-1.5 rounded-lg w-[18px], text text-sm */}
          <div className="flex items-center gap-3 w-full px-3 py-2 rounded-md">
            <div className="shrink-0 p-1.5 rounded-lg bg-(--bg-secondary)">
              <Skeleton className="w-[18px] h-[18px]" />
            </div>
            <Skeleton className="h-3.5 w-16" />
          </div>
        </div>
      </div>

      {/* "Topics" heading: text-xs uppercase, px-3 pt-2 mb-3 */}
      <div className="px-3 pt-2 mb-3 shrink-0">
        <Skeleton className="h-3 w-12" />
      </div>

      {/* Topic items: each has icon p-1.5 + text-xs + Badge */}
      <div className="flex-1 px-2 space-y-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md"
          >
            <div className="shrink-0 p-1.5 rounded-lg">
              <Skeleton className="w-[18px] h-[18px]" />
            </div>
            <Skeleton
              className="h-3 flex-1"
              style={{ maxWidth: `${60 + (i % 3) * 16}px` }}
            />
            <Skeleton className="h-5 w-7 rounded-full ml-auto shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemListSkeleton() {
  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header — title: text-2xl font-bold, filters: h-8 rounded-full */}
      <div className="pb-4 shrink-0">
        <div className="flex items-center gap-2 justify-between pb-2">
          <Skeleton className="h-8 w-52" />
          <div className="flex justify-end items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-10 hidden sm:block" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-14 hidden sm:block" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
          </div>
        </div>
        {/* Description: text-sm, two lines */}
        <div className="mt-2 space-y-1.5">
          <Skeleton className="h-3.5 w-96 max-w-full" />
          <Skeleton className="h-3.5 w-72 max-w-full" />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 flex flex-col rounded-lg border border-border overflow-hidden min-h-0">
        {/* Fixed Header — skeleton bars instead of text */}
        <div className="bg-transparent border-b border-border shrink-0">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="[&_th]:h-10">
                <th className="h-10 px-4 w-[80px] text-center align-middle">
                  <Skeleton className="h-3.5 w-10 mx-auto" />
                </th>
                <th className="h-10 px-4 w-[60px] align-middle">
                  <Skeleton className="h-3.5 w-6" />
                </th>
                <th className="h-10 px-4 align-middle">
                  <Skeleton className="h-3.5 w-8" />
                </th>
                <th className="h-10 px-4 w-[120px] align-middle">
                  <Skeleton className="h-3.5 w-16" />
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable Body — matches row padding/structure */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm text-left">
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr
                  key={i}
                  className={`border-0 ${i % 2 !== 0 ? "bg-muted/50" : "bg-(--bg-secondary)"}`}
                >
                  {/* Status: Circle size={18} */}
                  <td className="w-[80px] p-4 text-center align-middle py-3">
                    <Skeleton className="h-[18px] w-[18px] rounded-full mx-auto" />
                  </td>
                  {/* No.: font-medium text, single/double digit */}
                  <td className="w-[60px] p-4 align-middle py-3">
                    <Skeleton className="h-4 w-4" />
                  </td>
                  {/* Title: font-medium text-foreground, variable width */}
                  <td className="p-4 align-middle py-3">
                    <Skeleton
                      className="h-4"
                      style={{ width: `${120 + (i % 4) * 40}px`, maxWidth: "100%" }}
                    />
                  </td>
                  {/* Difficulty badge */}
                  <td className="w-[120px] p-4 align-middle py-3">
                    <Skeleton className="h-[22px] w-16 rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RightSidebarSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Widget — matches: pb-5 border-b */}
      <div className="pb-5 border-b border-border">
        {/* Header: p-2 icon + text-lg title */}
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg">
            <Skeleton className="w-5 h-5" />
          </div>
          <Skeleton className="ml-3 h-5 w-28" />
        </div>

        {/* Overall Progress: text-sm label + text-xs percent + h-2 bar + text-xs count */}
        <div className="mb-5 space-y-2">
          <div className="flex justify-between items-end">
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-3 w-7" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-3 w-44" />
        </div>

        {/* Difficulty Breakdown: text-xs labels + h-1.5 bars */}
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-7" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Level Widget — matches: p-2.5 rounded-xl icon + text-[10px] label + text-xl level */}
      <div className="w-full">
        <div className="flex items-center gap-3.5 mb-5">
          <div className="p-2.5 rounded-xl">
            <Skeleton className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-[10px] w-20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
          </div>
        </div>

        {/* XP bar: text-xs labels + h-2 bar */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>

        {/* Rank Journey: h-6 circles + text */}
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full shrink-0" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProblemPageSkeleton() {
  return (
    <div
      className="relative h-full flex flex-col overflow-hidden transition-colors duration-200
                    bg-(--bg-secondary) border-t border-(--border-primary)
                    dark:border-(--dk-border)"
    >
      <div className="relative z-10 px-4 w-full sm:px-6 lg:px-6 py-8 flex-1 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 h-full">
          {/* Left Sidebar — w-[18%] pr-8 */}
          <div className="hidden lg:block shrink-0 lg:w-[18%] h-full overflow-y-auto lg:pr-8">
            <TopicSidebarSkeleton />
          </div>

          {/* Center Content — flex-1 px-8 border-x */}
          <div
            className="flex-1 space-y-6 lg:px-8 h-full overflow-y-auto min-w-0
                        lg:border-x border-(--border-primary) dark:border-(--dk-border)"
          >
            <ProblemListSkeleton />
          </div>

          {/* Right Sidebar — w-[22%] pl-8 */}
          <div className="shrink-0 w-full lg:w-[22%] space-y-6 lg:pl-8 h-full overflow-y-auto">
            <RightSidebarSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
