import React from "react";
import { GiCrystalGrowth } from "react-icons/gi";

// ─── Basic Rising Coder Title ───────────────────────────────────
const RisingCoderTitle: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-blue-500/15 to-indigo-500/10 border border-blue-500/30 ${className ?? ""}`}
  >
    <GiCrystalGrowth className="w-3.5 h-3.5 text-blue-400 shrink-0" />
    <span className="text-xs font-black tracking-wide bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap">
      Rising Coder
    </span>
  </div>
);

// ─── Pro Animated Rising Coder Title ────────────────────────────
const RisingCoderProTitle: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div className={`relative inline-flex ${className ?? ""}`}>
    {/* Outer glow */}
    <div
      className="absolute inset-[-3px] rounded-lg blur-[4px]"
      style={{
        background:
          "conic-gradient(from var(--badge-angle, 0deg), #3b82f6 0%, #818cf8 25%, transparent 50%, #3b82f6 75%, #818cf8 100%)",
        animation: "badge-spin 2s linear infinite",
      }}
    />
    {/* Solid animated border */}
    <div
      className="absolute inset-[-1.5px] rounded-lg"
      style={{
        background:
          "conic-gradient(from var(--badge-angle, 0deg), #3b82f6 0%, #818cf8 25%, transparent 50%, #3b82f6 75%, #818cf8 100%)",
        animation: "badge-spin 2s linear infinite",
      }}
    />
    {/* Inner content */}
    <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-slate-900 to-slate-800">
      <GiCrystalGrowth className="w-3.5 h-3.5 text-blue-400 shrink-0 animate-pulse" />
      <span className="text-xs font-black tracking-wide bg-linear-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap">
        Rising Coder
      </span>
    </div>
  </div>
);

// Icon-compatible wrappers
export const RisingCoderIcon: React.FC<{ className?: string }> = ({
  className,
}) => <RisingCoderTitle className={className} />;

export const RisingCoderProIcon: React.FC<{ className?: string }> = ({
  className,
}) => <RisingCoderProTitle className={className} />;

export default RisingCoderTitle;
