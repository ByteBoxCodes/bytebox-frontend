import React from "react";
import { Crown, Sparkles } from "lucide-react";

// ─── Basic Leaderboard Frame Preview ────────────────────────────
const BasicFrame: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={`relative w-full max-w-[200px] rounded-xl overflow-hidden border border-indigo-500/30 bg-linear-to-r from-indigo-500/8 via-purple-500/5 to-indigo-500/8 ${className ?? ""}`}
  >
    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-linear-to-b from-indigo-500 to-purple-500" />
    <div className="flex items-center gap-2.5 px-3.5 py-2.5">
      <span className="text-[10px] font-black text-indigo-400 tabular-nums w-4 text-center shrink-0">
        #4
      </span>
      <div className="w-6 h-6 rounded-md bg-linear-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center shrink-0 ring-1 ring-indigo-500/30">
        <span className="text-[8px] font-bold text-indigo-300">U</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold text-foreground/80 truncate">YourName</div>
        <div className="text-[7px] text-muted-foreground/60 font-medium">@username</div>
      </div>
      <span className="text-[9px] font-bold text-indigo-400 shrink-0">1.2k XP</span>
    </div>
  </div>
);

// ─── Pro Animated Leaderboard Frame ─────────────────────────────
const ProFrame: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative w-full max-w-[200px] ${className ?? ""}`}>
    {/* Outer glow — beam with transparent gap */}
    <div
      className="absolute inset-[-3px] rounded-xl blur-[4px]"
      style={{
        background:
          "conic-gradient(from var(--badge-angle, 0deg), #6366f1 0%, #a855f7 25%, transparent 50%, #6366f1 75%, #a855f7 100%)",
        animation: "badge-spin 2s linear infinite",
      }}
    />
    {/* Solid animated border */}
    <div
      className="absolute inset-[-1.5px] rounded-xl"
      style={{
        background:
          "conic-gradient(from var(--badge-angle, 0deg), #6366f1 0%, #a855f7 25%, transparent 50%, #6366f1 75%, #a855f7 100%)",
        animation: "badge-spin 2s linear infinite",
      }}
    />

    {/* Inner row content */}
    <div className="relative z-10 rounded-xl overflow-hidden bg-linear-to-r from-slate-900 via-indigo-950/80 to-slate-900">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-linear-to-b from-indigo-400 to-purple-500" />
      <div className="flex items-center gap-2.5 px-3.5 py-2.5">
        <div className="flex flex-col items-center shrink-0 w-4">
          <Crown className="w-3 h-3 text-amber-400 mb-0.5 animate-pulse" />
          <span className="text-[9px] font-black text-amber-400 tabular-nums">#4</span>
        </div>
        <div className="w-6 h-6 rounded-md bg-linear-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center shrink-0 ring-1 ring-indigo-500/40">
          <Sparkles className="w-3 h-3 text-indigo-300 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-white/90 truncate">YourName</div>
          <div className="text-[7px] text-slate-400 font-medium">@username</div>
        </div>
        <span className="text-[9px] font-bold text-indigo-300 shrink-0">1.2k XP</span>
      </div>
    </div>
  </div>
);

// Icon-compatible wrappers
export const LeaderboardFrameIcon: React.FC<{ className?: string }> = ({
  className,
}) => <BasicFrame className={className} />;

export const LeaderboardFrameProIcon: React.FC<{ className?: string }> = ({
  className,
}) => <ProFrame className={className} />;

export default BasicFrame;
