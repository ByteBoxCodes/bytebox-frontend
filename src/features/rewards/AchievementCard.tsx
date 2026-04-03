import { useState } from "react";
import { Lock, CheckCircle } from "lucide-react";
import type { IUserReward } from "@/types/rewards";
import { REWARD_MAP } from "@/constants/rewards";
import { useClaimReward, useEquipReward } from "@/hooks/useRewardHooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface Props {
  reward: IUserReward;
  isOwnProfile: boolean;
  variant?: "compact" | "detailed";
}

export default function AchievementCard({
  reward,
  isOwnProfile,
  variant = "compact",
}: Props) {
  const config = REWARD_MAP[reward.value];

  // Modals state
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showEquipModal, setShowEquipModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Mutations
  const { mutate: claim, isPending: isClaimPending } = useClaimReward();
  const { mutate: equip, isPending: isEquipPending } = useEquipReward();

  if (!config) return null;

  const IconComponent = config.icon as React.ElementType;

  // Visual states
  const isLocked = !reward.eligible;
  const isEligibleButUnclaimed = reward.eligible && !reward.claimed;
  const isClaimedUnEquipped = reward.claimed && !reward.equipped;
  const isEquipped = reward.equipped;

  const handleCardClick = () => {
    if (!isOwnProfile) return;
    if (isLocked) return;
    if (isEligibleButUnclaimed) setShowClaimModal(true);
    if (isClaimedUnEquipped) setShowEquipModal(true);
    if (isEquipped && reward.type !== "XP") {
      setShowEquipModal(true);
    }
  };

  const handleClaim = () => {
    claim(reward.id, {
      onSuccess: () => setShowClaimModal(false),
    });
  };

  const handleEquip = (action: "equip" | "unequip") => {
    equip(
      { rewardId: reward.id, action },
      {
        onSuccess: () => setShowEquipModal(false),
      },
    );
  };

  return (
    <>
      <TooltipProvider delayDuration={150}>
        {variant === "compact" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`relative inline-flex cursor-pointer transition-all duration-300 ${
                  isLocked ? "grayscale opacity-50" : "hover:scale-105"
                } ${isEligibleButUnclaimed && isOwnProfile ? "animate-pulse" : ""}`}
                onClick={handleCardClick}
              >
                {/* Status Badge Overlays */}
                {isLocked && (
                  <div className="absolute -top-1.5 -right-1.5 z-10 bg-background border border-border rounded-full p-[2px] shadow-sm text-muted-foreground/80">
                    <Lock size={10} />
                  </div>
                )}

                {isEligibleButUnclaimed && isOwnProfile && (
                  <div className="absolute -top-1 -right-1 z-10 bg-background rounded-full p-0.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${config.color} animate-ping bg-current`}
                    />
                  </div>
                )}

                {/* Render the actual reward component directly */}
                <IconComponent className="" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <div className="flex flex-col gap-0.5 text-xs text-center py-0.5 max-w-[180px]">
                <span className="font-bold">{reward.name}</span>
                <span className="text-muted-foreground">
                  {isLocked
                    ? "Locked"
                    : isEquipped
                      ? "Active"
                      : config.description}
                </span>
              </div>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div
            className={`relative h-full flex flex-col items-center justify-center p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 overflow-hidden group ${
              isEquipped
                ? "border-emerald-500/30 bg-emerald-500/10 shadow-lg shadow-emerald-500/5"
                : isEligibleButUnclaimed
                  ? "border-border/80 bg-card/40 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/50"
                  : isClaimedUnEquipped
                    ? "border-border/80 bg-card/40"
                    : "border-border/60 bg-card/40 opacity-90"
            }`}
          >
            {/* Dynamic Background Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(120, 120, 120, 0.12) 0%, transparent 60%)",
              }}
            />

            {/* Card Border Highlight */}
            <div
              className={`absolute top-0 inset-x-0 h-1 bg-linear-to-r ${
                isEquipped
                  ? "from-emerald-500 via-emerald-400 to-emerald-500"
                  : isEligibleButUnclaimed
                    ? "from-primary/50 to-primary/10"
                    : "from-border/30 to-border/10"
              }`}
            />

            {/* Product Icon / Title Display */}
            <div
              className={`relative mb-5 mt-2 transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 ${isLocked ? "grayscale opacity-50" : ""}`}
            >
              <IconComponent className="" />
            </div>

            {/* Content */}
            <div className="flex flex-col items-center text-center relative z-10 w-full mb-6">
              <h4
                className={`text-[15px] font-extrabold tracking-tight leading-tight mb-2 ${
                  isEquipped
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-foreground"
                }`}
              >
                {reward.name}
              </h4>
              <p className="text-[12px] leading-relaxed line-clamp-2 px-2 min-h-[36px] text-muted-foreground">
                {config.description}
              </p>
            </div>

            {/* Action */}
            <div className="mt-auto relative z-10">
              {isLocked ? (
                <button
                  onClick={() => setShowPreviewModal(true)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-xs transition-all bg-foreground/5 hover:bg-foreground/10 text-foreground border border-border/60 hover:border-border active:scale-95 shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" /> Preview
                </button>
              ) : isEquipped ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    <CheckCircle className="w-3.5 h-3.5" /> Active
                  </div>
                  {isOwnProfile && reward.type !== "XP" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEquipModal(true)}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Unequip
                    </Button>
                  )}
                </div>
              ) : isEligibleButUnclaimed && isOwnProfile ? (
                <Button
                  onClick={() => setShowClaimModal(true)}
                  disabled={isClaimPending}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs transition-all active:scale-95 shadow-lg bg-foreground text-background hover:opacity-90 shadow-foreground/20 hover:shadow-foreground/30"
                >
                  Claim Reward
                </Button>
              ) : isClaimedUnEquipped &&
                isOwnProfile &&
                reward.type !== "XP" ? (
                <Button
                  onClick={() => setShowEquipModal(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs transition-all active:scale-95 shadow-lg bg-foreground text-background hover:opacity-90"
                >
                  Set as Active
                </Button>
              ) : null}
            </div>
          </div>
        )}
      </TooltipProvider>

      {/* Claim Modal */}
      <Dialog open={showClaimModal} onOpenChange={setShowClaimModal}>
        <DialogContent className="max-w-xs sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-5 pt-4">
              <IconComponent className="" />
              <span className="text-xl font-bold font-pj text-center">
                {reward.name}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center pb-2 text-muted-foreground text-sm">
            You've unlocked this reward! Claim it now to add it to your
            collection.
          </div>
          <Button
            className="w-full rounded-xl py-6 font-bold text-base shadow-lg"
            onClick={handleClaim}
            disabled={isClaimPending}
          >
            {isClaimPending ? "Claiming..." : "Claim Reward"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Equip Modal */}
      <Dialog open={showEquipModal} onOpenChange={setShowEquipModal}>
        <DialogContent className="max-w-xs sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-5 pt-4">
              <IconComponent className="" />
              <span className="text-xl font-bold font-pj text-center">
                {reward.name}
              </span>
            </DialogTitle>
            <DialogDescription className="text-center">
              {config.description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            {!isEquipped ? (
              <Button
                className="w-full rounded-xl py-6 font-bold text-base shadow-lg"
                onClick={() => handleEquip("equip")}
                disabled={isEquipPending}
              >
                {isEquipPending ? "Setting as active..." : "Set as Active"}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full rounded-xl border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                onClick={() => handleEquip("unequip")}
                disabled={isEquipPending}
              >
                {isEquipPending ? "Removing..." : "Unequip"}
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => setShowEquipModal(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal (locked items) */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-sm rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-20 blur-3xl z-0"
            style={{
              background:
                "radial-gradient(circle at top, var(--border-primary) 0%, transparent 80%)",
            }}
          />
          <div className="relative z-10 flex flex-col items-center text-center pt-4">
            <IconComponent className="" />
            <h3 className="text-xl font-bold tracking-tight mt-6 mb-2 text-foreground">
              {reward.name}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground mb-6">
              {config.description}
            </p>
            <div className="w-full relative p-px rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-border" />
              <div className="relative flex items-center justify-center gap-2 p-3.5 rounded-xl bg-card">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-[13px] font-bold text-muted-foreground tracking-wide">
                  Locked Objective
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
