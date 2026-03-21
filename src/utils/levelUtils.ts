export interface LevelInfo {
  level: number;
  title: string;
  currentPoints: number;
  levelXp: number;
  pointsForNextLevel: number;
  progressPercent: number;
}

/**
 * Calculates user level and title.
 * The backend provides totalPoints, level, and levelXp.
 */
export const getLevelInfo = (
  totalPoints: number = 0,
  level: number = 1,
  levelXp: number = 0,
): LevelInfo => {
  // Required XP for the current level to advance to the next level
  const pointsForNextLevel = level * 5 + 10;

  const rawProgress =
    pointsForNextLevel > 0 ? (levelXp / pointsForNextLevel) * 100 : 0;
  const progressPercent = Math.round(Math.min(100, Math.max(0, rawProgress)));

  // Determine Title based on level
  let title = "Newbie";
  if (level >= 50) title = "Champion";
  else if (level >= 40) title = "Expert";
  else if (level >= 30) title = "Builder";
  else if (level >= 15) title = "Explorer";

  return {
    level,
    title,
    currentPoints: totalPoints,
    levelXp,
    pointsForNextLevel,
    progressPercent,
  };
};
