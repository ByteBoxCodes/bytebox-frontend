import React from "react";
import { User } from "lucide-react";

// ─── Basic Avatar Frame ─────────────────────────────────────────
// A stylish static border around an avatar placeholder
const BasicAvatarFrame: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative inline-flex items-center justify-center ${className ?? ""}`}>
    {/* Static gradient ring */}
    <div className="absolute inset-0 rounded-full bg-linear-to-br from-pink-500 to-violet-500 p-[3px]">
      <div className="w-full h-full rounded-full bg-card" />
    </div>

    {/* Avatar placeholder */}
    <div className="relative z-10 w-16 h-16 rounded-full bg-linear-to-br from-pink-500/15 to-violet-500/15 flex items-center justify-center ring-[3px] ring-transparent">
      <div className="w-[52px] h-[52px] rounded-full bg-card flex items-center justify-center">
        <User className="w-6 h-6 text-pink-400/70" />
      </div>
    </div>

    {/* Decorative corner dots */}
    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50" />
    <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-violet-500 shadow-sm shadow-violet-500/50" />
  </div>
);

// ─── Pro Animated Avatar Frame ──────────────────────────────────
// Spinning gradient border with glow
const ProAvatarFrame: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative inline-flex items-center justify-center ${className ?? ""}`}>
    {/* Outer glow — beam sweep */}
    <div
      className="absolute inset-[-4px] rounded-full blur-[5px]"
      style={{
        background:
          "conic-gradient(from var(--badge-angle, 0deg), #ec4899 0%, #8b5cf6 25%, transparent 50%, #ec4899 75%, #8b5cf6 100%)",
        animation: "badge-spin 2s linear infinite",
      }}
    />
    {/* Solid animated border */}
    <div
      className="absolute inset-[-2px] rounded-full"
      style={{
        background:
          "conic-gradient(from var(--badge-angle, 0deg), #ec4899 0%, #8b5cf6 25%, transparent 50%, #ec4899 75%, #8b5cf6 100%)",
        animation: "badge-spin 2s linear infinite",
      }}
    />

    {/* Avatar placeholder */}
    <div className="relative z-10 w-16 h-16 rounded-full bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="w-[52px] h-[52px] rounded-full bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
        <User className="w-6 h-6 text-pink-300/80 animate-pulse" />
      </div>
    </div>

    {/* Decorative corner dots with pulse */}
    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50 animate-pulse" />
    <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-violet-500 shadow-sm shadow-violet-500/50 animate-pulse" style={{ animationDelay: "0.5s" }} />
  </div>
);

// Icon-compatible wrappers
export const AvatarFrameIcon: React.FC<{ className?: string }> = ({
  className,
}) => <BasicAvatarFrame className={className} />;

export const AvatarFrameProIcon: React.FC<{ className?: string }> = ({
  className,
}) => <ProAvatarFrame className={className} />;

export default BasicAvatarFrame;
