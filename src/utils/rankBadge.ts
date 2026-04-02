import { getLevelInfo } from "@/utils/levelUtils";
import { BADGES } from "@/constants/badges";

export interface RankBadgeData {
  title: string;
  level: number;
  icon: (typeof BADGES)[number]["icon"];
  color: string;
  bg: string;
  fill: string;
  border: string;
  tagBorder: string;
  hex: string;
}

/**
 * Derives the rank badge data from user points, level, and levelXp.
 * Use this instead of duplicating the BADGES lookup logic everywhere.
 */
export function getRankBadge(
  points: number = 0,
  level: number = 1,
  levelXp: number = 0
): RankBadgeData {
  const levelInfo = getLevelInfo(points, level, levelXp);
  const badge =
    [...BADGES].reverse().find((b) => levelInfo.level >= b.req) || BADGES[0];

  return {
    title: badge.title,
    level: levelInfo.level,
    icon: badge.icon,
    color: badge.color,
    bg: badge.bg,
    fill: badge.fill,
    border: badge.border,
    tagBorder: badge.tagBorder,
    hex: badge.hex,
  };
}
