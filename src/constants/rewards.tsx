import React from "react";
import {
  type LucideIcon,
} from "lucide-react";
import {
  RisingCoderIcon,
  RisingCoderProIcon,
} from "@/components/rewards/RisingCoderBadge";
import {
  LeaderboardFrameIcon,
  LeaderboardFrameProIcon,
} from "@/components/rewards/AnimatedBadge";
import {
  AvatarFrameIcon,
  AvatarFrameProIcon,
} from "@/components/rewards/AvatarFrame";
import {
  EliteBadgeIcon,
  PremiumRenewalIcon,
} from "@/components/rewards/EliteBadge";

// Custom XP Icon Component
const XpIcon: React.FC<React.SVGProps<SVGSVGElement> & { className?: string }> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="900" fill="currentColor" fontFamily="system-ui, sans-serif">
      XP
    </text>
  </svg>
);

export interface Reward {
  title: string;
  description: string;
  icon: LucideIcon | React.FC<{ className?: string }>;
  color: string;
  bg: string;
  border: string;
  type?: "icon" | "title";
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
      title: "100 XP",
      description: "Earn an immediate 100 XP to instantly boost your rank",
      icon: XpIcon,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
    },
    premium: {
      title: "300 XP",
      description:
        "Earn a massive 300 XP bonus to triple your progression speed",
      icon: XpIcon,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    },
  },
  {
    level: 20,
    problemsRequired: 25,
    basic: {
      title: '"Rising Coder" Title',
      description: 'Unlock the exclusive "Rising Coder" title to display on your profile',
      icon: RisingCoderIcon,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      type: "title",
    },
    premium: {
      title: '"Rising Coder" Animated Title',
      description: 'An animated "Rising Coder" title with a vivid rainbow border effect',
      icon: RisingCoderProIcon,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
      type: "title",
    },
  },
  {
    level: 30,
    problemsRequired: 50,
    basic: {
      title: "Avatar Border Frame",
      description: "A stylish gradient border frame to make your avatar stand out",
      icon: AvatarFrameIcon,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-500/30",
      type: "title",
    },
    premium: {
      title: "Animated Avatar Frame",
      description: "A premium animated avatar frame with a spinning glow effect",
      icon: AvatarFrameProIcon,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
      type: "title",
    },
  },
  {
    level: 40,
    problemsRequired: 80,
    basic: {
      title: "Leaderboard Style Frame",
      description: "A custom frame to make your row stand out on the leaderboard",
      icon: LeaderboardFrameIcon,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
      type: "title",
    },
    premium: {
      title: "Animated Leaderboard Frame",
      description: "A premium animated frame with rainbow border effects on the leaderboard",
      icon: LeaderboardFrameProIcon,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      type: "title",
    },
  },
  {
    level: 50,
    problemsRequired: 120,
    basic: {
      title: "ByteBox Elite Badge",
      description: "An animated elite badge with layered icons — the ultimate mark of a champion",
      icon: EliteBadgeIcon,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      type: "title",
    },
    premium: {
      title: "Free 1 Month Subscription",
      description:
        "Earn a free 1 month renewal of your PRO subscription as the ultimate reward",
      icon: PremiumRenewalIcon,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-400/40",
      type: "title",
    },
  },
];
