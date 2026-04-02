import {
  Coins,
  Award,
  Unlock,
  Palette,
  Crown,
  Zap,
  Star,
  Shield,
  Gem,
  type LucideIcon,
} from "lucide-react";

export interface Reward {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
}

export interface MilestoneReward {
  level: number;
  problemsRequired: number;
  basic: Reward;
  premium: Reward;
}

export const MILESTONE_LEVELS = [10, 20, 30, 40, 50] as const;

export const MILESTONE_REWARDS: MilestoneReward[] = [
  {
    level: 10,
    problemsRequired: 10,
    basic: {
      title: "100 Coins",
      description: "Earn 100 coins to spend in the store",
      icon: Coins,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
    },
    premium: {
      title: "300 Coins + XP Boost",
      description:
        "Get 300 coins and a 2x XP boost for 24 hours",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    },
  },
  {
    level: 20,
    problemsRequired: 25,
    basic: {
      title: "Explorer Badge + 200 Coins",
      description: 'Unlock the exclusive "Explorer" badge for your profile',
      icon: Award,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    },
    premium: {
      title: "Rare Explorer + 3x XP Boost",
      description: "A rare animated badge and 3x XP boost for 48 hours",
      icon: Star,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
    },
  },
  {
    level: 30,
    problemsRequired: 50,
    basic: {
      title: "Unlock Exclusive Problems",
      description: "Access 5 exclusive challenge problems",
      icon: Unlock,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    premium: {
      title: "Extended Access + 500 Coins",
      description: "Unlock all premium problems and 500 bonus coins",
      icon: Shield,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
      border: "border-teal-500/30",
    },
  },
  {
    level: 40,
    problemsRequired: 80,
    basic: {
      title: "Profile Frame",
      description: "Unlock a custom profile avatar frame",
      icon: Palette,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-500/30",
    },
    premium: {
      title: 'Custom Frame + "Expert" Title',
      description: "Animated frame, custom title, and 800 coins",
      icon: Gem,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
    },
  },
  {
    level: 50,
    problemsRequired: 120,
    basic: {
      title: "Champion Badge",
      description: 'The legendary "Champion" badge on your profile',
      icon: Crown,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    },
    premium: {
      title: "Champion Elite + 5x XP",
      description:
        "Exclusive animated badge, unique title, and 5x XP boost",
      icon: Crown,
      color: "text-amber-400",
      bg: "bg-linear-to-br from-amber-500/15 to-yellow-500/15",
      border: "border-amber-400/40",
    },
  },
];
