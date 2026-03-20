import { Skeleton } from "@/components/ui/skeleton";

export default function SubmissionPageSkeleton() {
  return (
    <div
      className="relative h-full flex flex-col overflow-hidden transition-colors duration-200
                    bg-(--bg-secondary) border-(--bg-secondary)
                    dark:border-(--bg-secondary)"
    >
      <div className="relative z-10 flex-1 w-full flex border-t border-(--border-primary) dark:border-(--dk-border)">
        {/* Left Panel — Question */}
        <div className="flex-1 h-full flex flex-col bg-(--bg-primary) dark:bg-(--bg-secondary) border-r border-(--border-primary) dark:border-(--dk-border)">
          {/* Tab bar: Description | Submissions */}
          <div className="px-3 shrink-0 flex items-center h-10 border-b border-(--border-primary) dark:border-(--dk-border)">
            <div className="flex items-center gap-1 h-full">
              <div className="flex items-center gap-1.5 h-7 px-3">
                <Skeleton className="w-3.5 h-3.5" />
                <Skeleton className="h-3 w-[70px]" />
              </div>
              <div className="w-px h-3.5 bg-(--border-primary) mx-1" />
              <div className="flex items-center gap-1.5 h-7 px-3">
                <Skeleton className="w-3.5 h-3.5" />
                <Skeleton className="h-3 w-[76px]" />
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-12">
            {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-7 w-64" />
              {/* Badges: EASY, Input & Output, Favorite, Solved */}
              <div className="flex items-center gap-3 mt-2">
                <Skeleton className="h-[22px] w-12 rounded-full" />
                <Skeleton className="h-[22px] w-24 rounded-full" />
                <Skeleton className="h-[22px] w-18 rounded-full" />
                <Skeleton className="h-[22px] w-16 rounded-full" />
              </div>
            </div>

            {/* Description paragraphs: text-[16px] leading-7 */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>

            {/* Instructions: heading + numbered list */}
            <div className="space-y-3 pt-4">
              <Skeleton className="h-3.5 w-28" />
              <div className="ml-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Skeleton className="h-4 w-3 shrink-0 mt-0.5" />
                  <Skeleton className="h-4 w-[85%]" />
                </div>
                <div className="flex items-start gap-2">
                  <Skeleton className="h-4 w-3 shrink-0 mt-0.5" />
                  <Skeleton className="h-4 w-[75%]" />
                </div>
                <div className="flex items-start gap-2">
                  <Skeleton className="h-4 w-3 shrink-0 mt-0.5" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              </div>
            </div>

            {/* Constraints: heading + bullet list */}
            <div className="space-y-3 pt-4">
              <Skeleton className="h-3.5 w-24" />
              <div className="ml-2 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/30 mt-2 shrink-0" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/30 mt-2 shrink-0" />
                  <Skeleton className="h-4 w-[75%]" />
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/30 mt-2 shrink-0" />
                  <Skeleton className="h-4 w-[50%]" />
                </div>
              </div>
            </div>

            {/* Example: heading + bordered block with Output/Explanation */}
            <div className="space-y-4 pt-4">
              <Skeleton className="h-[15px] w-20" />
              <div className="pl-4 border-l-2 border-(--border-primary) flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Skeleton className="h-3.5 w-12 shrink-0" />
                  <Skeleton className="h-3.5 w-24" />
                </div>
                <div className="mt-1">
                  <Skeleton className="h-3.5 w-20 mb-1" />
                  <Skeleton className="h-4 w-[90%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel — Editor */}
        <div className="flex-1 h-full flex flex-col bg-(--bg-secondary)">
          {/* Toolbar: LANGUAGE dropdown + Run Code + Submit */}
          <div className="shrink-0 flex items-center justify-between px-4 h-10 border-b border-(--border-primary) dark:border-(--dk-border)">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>

          {/* Code editor area — dark bg with line numbers */}
          <div className="flex-1 min-h-0 bg-[#1e1e1e] p-4">
            <div className="space-y-2.5">
              {Array.from({ length: 11 }).map((_, i) => {
                const widths = [200, 180, 0, 160, 0, 120, 140, 0, 100, 20, 0];
                return (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-6 text-right text-xs text-white/20 font-mono select-none">
                      {i + 1}
                    </span>
                    {widths[i] > 0 && (
                      <Skeleton
                        className="h-3.5 rounded-sm bg-white/8"
                        style={{ width: `${widths[i]}px` }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom panel — Testcases / Test Result tabs */}
          <div className="shrink-0 border-t border-(--border-primary) dark:border-(--dk-border)">
            {/* Tab header */}
            <div className="px-4 py-[6px] border-b border-(--border-primary) flex items-center gap-4 bg-(--bg-tertiary)/30">
              <div className="flex items-center gap-2 pb-1.5">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-3.5 w-16" />
              </div>
              <Skeleton className="h-3.5 w-16" />
            </div>

            {/* Tab content: Case pill + expected output */}
            <div className="p-5 space-y-4">
              <Skeleton className="h-7 w-16 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
