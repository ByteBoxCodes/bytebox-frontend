export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserProfile {
  _id: string;
  name: string;
  email: string;
  username: string;
  createdAt?: string;
  problemsSolved?: number;
  problemsAttempted?: number;
  avatar?: string;
  bio?: string | null;
  website?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
}

export interface IHeatmapData {
  date: string;
  count: number;
}

export interface IUserStats {
  totalSubmissions: number;
  acceptedSubmissions: number;
  totalSolvedProblems: number;
  currentStreak: number;
  maxStreak: number;
  heatmap: IHeatmapData[];
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  totalProblems: number;
}
