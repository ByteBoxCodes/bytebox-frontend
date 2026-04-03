import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { IUserReward } from "@/types/rewards";
import AchievementCard from "@/features/rewards/AchievementCard";
import { Trophy, ChevronRight } from "lucide-react";

interface Props {
  rewards: IUserReward[];
  isOwnProfile: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  ALL: "All Rewards",
  TITLE: "Titles",
  AVATAR: "Avatar Frames",
  CARD: "Cards",
};

export default function AllRewardsModal({ rewards, isOwnProfile }: Props) {
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const validRewards = useMemo(
    () => rewards.filter((r) => r.type !== "XP"),
    [rewards],
  );

  const types = useMemo(() => {
    const uniqueTypes = Array.from(
      new Set(validRewards.map((r) => r.type || "Misc")),
    );
    return ["ALL", ...uniqueTypes];
  }, [validRewards]);

  const displayedRewards = useMemo(() => {
    if (selectedType === "ALL") return validRewards;
    return validRewards.filter((r) => (r.type || "Misc") === selectedType);
  }, [validRewards, selectedType]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-primary hover:bg-primary/10 h-8 font-bold"
        >
          View All Rewards
          <ChevronRight size={14} className="ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-6xl h-[85vh] p-0 overflow-hidden flex flex-col bg-background border border-border/50 shadow-2xl rounded-2xl gap-0">
        {/* Header */}
        <DialogHeader className="px-6 py-5 border-b border-border/40 shrink-0">
          <DialogTitle className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Reward Showcase
          </DialogTitle>
        </DialogHeader>

        {validRewards.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            No rewards available to display.
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <nav className="w-48 lg:w-56 border-r border-border/40 shrink-0 overflow-y-auto bg-muted/5 p-4 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold px-3 mb-3">
                Categories
              </p>
              {types.map((type) => {
                const count =
                  type === "ALL"
                    ? validRewards.length
                    : validRewards.filter(
                        (r) => (r.type || "Misc") === type,
                      ).length;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-between ${
                      selectedType === type
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    <span>{TYPE_LABELS[type] ?? `${type}s`}</span>
                    <span
                      className={`text-xs tabular-nums ${selectedType === type ? "text-primary-foreground/70" : "text-muted-foreground/50"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 auto-rows-fr">
                {displayedRewards.map((reward) => (
                  <AchievementCard
                    key={reward.id}
                    reward={reward}
                    isOwnProfile={isOwnProfile}
                    variant="detailed"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
