import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Trophy, Sparkles, Zap } from "lucide-react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    passedTestCases?: number;
    totalTestCases?: number;
    problemTitle?: string;
}

/* ── Floating Particle ── */
function Particle({ delay, left, size, color }: { delay: number; left: string; size: number; color: string }) {
    return (
        <div
            className="absolute rounded-full animate-float-up pointer-events-none"
            style={{
                left,
                bottom: "-10px",
                width: size,
                height: size,
                background: color,
                animationDelay: `${delay}ms`,
                opacity: 0,
            }}
        />
    );
}

const PARTICLES = [
    { delay: 0, left: "10%", size: 6, color: "#34d399" },
    { delay: 200, left: "25%", size: 4, color: "#fbbf24" },
    { delay: 400, left: "40%", size: 8, color: "#818cf8" },
    { delay: 150, left: "55%", size: 5, color: "#f472b6" },
    { delay: 350, left: "70%", size: 7, color: "#34d399" },
    { delay: 100, left: "85%", size: 4, color: "#60a5fa" },
    { delay: 500, left: "15%", size: 5, color: "#fbbf24" },
    { delay: 300, left: "50%", size: 6, color: "#a78bfa" },
    { delay: 250, left: "75%", size: 4, color: "#34d399" },
    { delay: 450, left: "35%", size: 5, color: "#fb923c" },
    { delay: 550, left: "60%", size: 3, color: "#f472b6" },
    { delay: 100, left: "90%", size: 6, color: "#818cf8" },
];

export default function SuccessModal({
    isOpen,
    onClose,
    passedTestCases,
    totalTestCases,
    problemTitle,
}: SuccessModalProps) {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => setShowContent(true), 150);
            return () => clearTimeout(t);
        }
        setShowContent(false);
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md p-0 overflow-hidden bg-(--bg-primary) border border-(--border-primary) rounded-2xl shadow-2xl">
                {/* ── Top Glow & Particles ── */}
                <div className="relative overflow-hidden">
                    {/* Gradient header */}
                    <div className="relative h-40 bg-linear-to-br from-emerald-600 via-emerald-500 to-teal-500 flex items-center justify-center overflow-hidden">
                        {/* Radial pulse */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] animate-pulse" />

                        {/* Floating particles */}
                        {PARTICLES.map((p, i) => (
                            <Particle key={i} {...p} />
                        ))}

                        {/* Trophy Icon */}
                        <div
                            className={`relative z-10 transition-all duration-700 ${showContent
                                ? "scale-100 opacity-100"
                                : "scale-50 opacity-0"
                                }`}
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl animate-pulse" />
                                <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-5 border border-white/30 shadow-lg">
                                    <Trophy className="w-12 h-12 text-white drop-shadow-lg" />
                                </div>
                                {/* Sparkles around trophy */}
                                <Sparkles
                                    className="absolute -top-2 -right-2 w-5 h-5 text-yellow-300 animate-spin"
                                    style={{ animationDuration: "3s" }}
                                />
                                <Zap
                                    className="absolute -bottom-1 -left-3 w-4 h-4 text-yellow-200 animate-bounce"
                                    style={{ animationDelay: "500ms" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Wave separator */}
                    <svg
                        className="absolute bottom-0 left-0 w-full"
                        viewBox="0 0 400 30"
                        preserveAspectRatio="none"
                        style={{ height: "20px" }}
                    >
                        <path
                            d="M0,20 Q100,0 200,15 T400,10 L400,30 L0,30 Z"
                            className="fill-(--bg-primary)"
                        />
                    </svg>
                </div>

                {/* ── Body ── */}
                <div
                    className={`px-8 pb-8 pt-2 space-y-6 transition-all duration-500 delay-300 ${showContent
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                        }`}
                >
                    {/* Title */}
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-extrabold text-(--text-primary) tracking-tight">
                            Congratulations! 🎉
                        </h2>
                        {problemTitle && (
                            <p className="text-sm text-(--text-tertiary) font-medium">
                                You solved{" "}
                                <span className="text-(--text-primary) font-semibold">
                                    {problemTitle}
                                </span>
                            </p>
                        )}
                    </div>

                    {/* Stats Card */}
                    <div className="bg-(--bg-secondary) rounded-xl border border-(--border-primary) p-4">
                        <div className="flex items-center justify-center gap-6">
                            {/* Test Cases */}
                            <div className="flex flex-col items-center gap-1.5">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    <span className="text-2xl font-bold text-emerald-400 tabular-nums">
                                        {passedTestCases ?? "–"}
                                        <span className="text-sm text-(--text-tertiary) font-medium">
                                            /{totalTestCases ?? "–"}
                                        </span>
                                    </span>
                                </div>
                                <span className="text-[11px] text-(--text-tertiary) font-semibold uppercase tracking-wider">
                                    Test Cases Passed
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-10 bg-(--border-primary)" />

                            {/* Accuracy */}
                            <div className="flex flex-col items-center gap-1.5">
                                <span className="text-2xl font-bold text-emerald-400 tabular-nums">
                                    100%
                                </span>
                                <span className="text-[11px] text-(--text-tertiary) font-semibold uppercase tracking-wider">
                                    Accuracy
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Motivational message */}
                    <p className="text-center text-sm text-(--text-secondary) leading-relaxed">
                        Your solution passed every test case flawlessly. Keep
                        pushing your limits and tackle the next challenge!
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={() => navigate("/problems")}
                            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl border-none cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Solve More Problems
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="w-full h-10 text-(--text-secondary) hover:text-(--text-primary) font-medium rounded-xl cursor-pointer transition-colors"
                        >
                            View Results
                        </Button>
                    </div>
                </div>

                {/* ── Keyframe styles ── */}
                <style>{`
                    @keyframes float-up {
                        0% {
                            opacity: 0;
                            transform: translateY(0) scale(1);
                        }
                        20% {
                            opacity: 1;
                        }
                        100% {
                            opacity: 0;
                            transform: translateY(-180px) scale(0.3);
                        }
                    }
                    .animate-float-up {
                        animation: float-up 2.5s ease-out infinite;
                    }
                `}</style>
            </DialogContent>
        </Dialog>
    );
}
