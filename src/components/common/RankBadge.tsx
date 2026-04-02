import { getRankBadge, type RankBadgeData } from "@/utils/rankBadge";

type RankBadgeVariant = "pill" | "inline" | "icon";
type RankBadgeSize = "sm" | "md";

interface RankBadgeProps {
  /** User points (total XP) */
  points?: number;
  /** User level */
  level?: number;
  /** User level XP (progress within current level) */
  levelXp?: number;
  /** Pre-computed badge data — skips internal computation if provided */
  badge?: RankBadgeData;
  /** Visual variant */
  variant?: RankBadgeVariant;
  /** Size preset */
  size?: RankBadgeSize;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable rank badge component.
 *
 * Variants:
 * - `pill`   — colored background pill with icon + title (default)
 * - `inline` — icon + title text only, no background
 * - `icon`   — icon only inside colored background
 */
export default function RankBadge({
  points = 0,
  level = 1,
  levelXp = 0,
  badge: precomputed,
  variant = "pill",
  size = "sm",
  className = "",
}: RankBadgeProps) {
  const badge = precomputed ?? getRankBadge(points, level, levelXp);
  const Icon = badge.icon;

  const iconSize = size === "sm" ? 12 : 14;

  if (variant === "icon") {
    return (
      <div
        className={`p-2.5 rounded-xl ${badge.bg} ${className}`}
      >
        <Icon
          size={size === "sm" ? 16 : 20}
          className={`${badge.color}`}
        />
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <Icon
          size={iconSize}
          className={`${badge.color} ${badge.fill}`}
        />
        <span
          className={`font-bold text-[10px] uppercase tracking-wider ${badge.color}`}
        >
          {badge.title}
        </span>
      </div>
    );
  }

  // pill (default)
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${badge.bg} ${badge.color} border ${badge.tagBorder} shadow-xs transition-colors duration-300 ${className}`}
    >
      <Icon size={iconSize} className="opacity-80" />
      <span className="tracking-wide uppercase">{badge.title}</span>
    </div>
  );
}
