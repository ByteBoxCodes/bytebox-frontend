// ─── Mini Progress Dots ─────────────────────────────────────────
export default function ProgressDots({
  from,
  to,
  userLevel,
}: {
  from: number;
  to: number;
  userLevel: number;
}) {
  const total = to - from - 1;
  if (total <= 0) return null;

  const completed = Math.min(total, Math.max(0, userLevel - from));
  const showCount = Math.min(total, 9);

  return (
    <div className="relative flex gap-4 sm:gap-5">
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0 w-10">
        <div className="flex-1 w-0.5">
          <div
            className={`w-full h-full min-h-6 transition-colors duration-500 ${
              userLevel >= to
                ? "bg-emerald-500/30"
                : "bg-border dark:bg-zinc-800"
            }`}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex-1 flex items-center gap-1 py-1">
        {Array.from({ length: showCount }, (_, i) => {
          const level = from + 1 + Math.round((i * total) / showCount);
          const done = userLevel >= level;
          const isCurr = userLevel === level;
          return (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                isCurr
                  ? "w-2.5 h-2.5 bg-emerald-500 ring-2 ring-emerald-500/20"
                  : done
                    ? "w-1.5 h-1.5 bg-emerald-500/50"
                    : "w-1.5 h-1.5 bg-border dark:bg-zinc-700"
              }`}
              title={`Level ${level}`}
            />
          );
        })}
        <span className="text-[10px] ml-1.5 font-medium text-muted-foreground/50">
          {completed}/{total}
        </span>
      </div>
    </div>
  );
}
