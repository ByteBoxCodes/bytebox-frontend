import React from "react";
import { Layers, RefreshCw } from "lucide-react";

// ─── ByteBox Elite Title ────────────────────────────────────────
// Icon left (Layers), text right — animated border
const EliteTitle: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative inline-flex ${className ?? ""}`}>
    {/* Animated border */}
    <div
      className="absolute inset-[-3px] rounded-lg blur-xs"
      style={{
        background:
          "conic-gradient(from var(--badge-angle, 0deg), #f59e0b 0%, #d97706 25%, transparent 50%, #f59e0b 75%, #d97706 100%)",
        animation: "badge-spin 2s linear infinite",
      }}
    />
    <div
      className="absolute inset-[-1.5px] rounded-lg"
      style={{
        background:
          "conic-gradient(from var(--badge-angle, 0deg), #f59e0b 0%, #d97706 25%, transparent 50%, #f59e0b 75%, #d97706 100%)",
        animation: "badge-spin 2s linear infinite",
      }}
    />
    {/* Inner content */}
    <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-slate-900 to-slate-800">
      <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
      <span className="text-xs font-black tracking-wide bg-linear-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
        ByteBox Elite
      </span>
    </div>
  </div>
);

// ─── Pro Renewal Title ──────────────────────────────────────────
// Icon left (RefreshCw), text right — animated border
const RenewalTitle: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/30 ${className ?? ""}`}
  >
    <RefreshCw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
    <span className="text-xs font-black tracking-wide bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent whitespace-nowrap">
      Free 1 Month Subscription
    </span>
  </div>
);

// Icon-compatible wrappers
export const EliteBadgeIcon: React.FC<{ className?: string }> = ({
  className,
}) => <EliteTitle className={className} />;

export const PremiumRenewalIcon: React.FC<{ className?: string }> = ({
  className,
}) => <RenewalTitle className={className} />;

export default EliteTitle;
