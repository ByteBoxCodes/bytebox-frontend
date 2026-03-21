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
  points?: number;
  level?: number;
  levelXp?: number;
  problemsSolved?: number;
  problemsAttempted?: number;
  avatarUrl?: string;
  bio?: string | null;
  websiteUrl?: string | null;
  githubUsername?: string | null;
  linkedinUsername?: string | null;
  twitterUsername?: string | null;
  instagramUsername?: string | null;
  preferredLanguage?: string | null;
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
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  totalProblems: number;
  languages: string[];
}

export interface IUpdateProfile {
  name?: string;
  bio?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  avatar?: string;
  username?: string;
}

export interface IHeaderProfile {
  name: string;
  username: string;
  avatarUrl: string;
  currentStreak: number;
  maxStreak: number;
}
