export interface LevelInfo {
  level: number;
  title: string;
  currentPoints: number;
  pointsForNextLevel: number;
  progressPercent: number;
}

/**
 * Calculates user level and title based on their total points.
 * Level progression: 100 points = 1 level.
 */
export const getLevelInfo = (
  totalPoints: number,
  providedLevel?: number,
): LevelInfo => {
  // Basic conversion: 100 points = 1 level
  const level = providedLevel ?? Math.floor(totalPoints / 100) + 1;

  // Calculate progress to next level
  const currentLevelBasePoints = (level - 1) * 100;
  const nextLevelBasePoints = level * 100;
  const pointsInCurrentLevel = totalPoints - currentLevelBasePoints;
  const pointsNeeded = 100;
  const progressPercent = Math.round(
    (pointsInCurrentLevel / pointsNeeded) * 100,
  );

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
    pointsForNextLevel: nextLevelBasePoints,
    progressPercent,
  };
};
