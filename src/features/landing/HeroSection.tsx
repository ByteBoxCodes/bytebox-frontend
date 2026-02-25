import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight, Zap, Trophy, Clock, BookOpen } from "lucide-react";
import {
    SiPython, SiJavascript, SiCplusplus, SiTypescript,
    SiGo, SiRust, SiKotlin, SiSwift,
} from "react-icons/si";
import { FaJava, FaC } from "react-icons/fa6";

/* ─── Avatars ─── */
const avatars = [
    "https://i.pravatar.cc/40?img=1",
    "https://i.pravatar.cc/40?img=12",
    "https://i.pravatar.cc/40?img=33",
];

/* ─── Languages (icon color = theme text) ─── */
const langs = [
    { name: "C", Icon: FaC },
    { name: "C++", Icon: SiCplusplus },
    { name: "Java", Icon: FaJava },
    { name: "Python", Icon: SiPython },
    { name: "JavaScript", Icon: SiJavascript },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "Go", Icon: SiGo },
    { name: "Rust", Icon: SiRust },
    { name: "Kotlin", Icon: SiKotlin },
    { name: "Swift", Icon: SiSwift },
];

/* ─── Feature highlights (unique — no stat duplication) ─── */
const features = [
    { icon: <Zap size={14} />, label: "Real-time Feedback" },
    { icon: <Clock size={14} />, label: "Progress Tracking" },
    { icon: <BookOpen size={14} />, label: "Structured Curriculum" },
    { icon: <Trophy size={14} />, label: "Interview Prep" },
];

/* ─── Counter ─── */
const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
    const [n, setN] = useState(0);
    useEffect(() => {
        let cur = 0; const step = to / 60;
        const t = setInterval(() => {
            cur += step;
            if (cur >= to) { setN(to); clearInterval(t); } else setN(Math.floor(cur));
        }, 2000 / 60);
        return () => clearInterval(t);
    }, [to]);
    return <>{n}{suffix}</>;
};

/* ─── Main ─── */
const HeroSection = () => {
    const up = (delay = 0) => ({
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <div
            className="relative overflow-hidden"
            style={{
                background: "var(--bg-secondary)",
                height: "calc(100vh - 4rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {/* Dot-grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, var(--text-secondary) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    opacity: 0.05,
                }} />
            {/* Center glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 55% at 50% 38%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />

            <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto w-full gap-5">

                {/* Social proof */}
                <motion.div {...up(0)} className="flex items-center gap-2.5">
                    <div className="flex -space-x-2">
                        {avatars.map((src, i) => (
                            <img key={i} src={src} alt="" className="w-7 h-7 rounded-full ring-2 ring-offset-1 object-cover" />
                        ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold"
                        style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-secondary)" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Join 10,000+ developers already coding
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1 {...up(0.08)}
                    className="font-black tracking-tight leading-[1.07]"
                    style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", color: "var(--text-primary)" }}>
                    Master Programming <br className="hidden sm:block" />
                    <span style={{ color: "var(--text-secondary)" }}>Fundamentals with ByteBox</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p {...up(0.16)}
                    className="text-sm sm:text-base leading-relaxed max-w-xl"
                    style={{ color: "var(--text-tertiary)" }}>
                    Solve curated coding challenges across 50+ topics — from basic conditionals to advanced algorithms.
                    Instant feedback. Real-time judge. Track your progress.
                </motion.p>

                {/* CTAs */}
                <motion.div {...up(0.22)} className="flex flex-wrap items-center justify-center gap-3">
                    <Link to="/register"
                        className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold rounded-full transition-all duration-150 hover:scale-[1.03] hover:opacity-90 active:scale-[0.97]"
                        style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}>
                        Get Started — Free
                    </Link>
                    <Link to="/problems"
                        className="inline-flex items-center gap-1 px-7 py-3 text-sm font-bold rounded-full border transition-all duration-150 hover:scale-[1.03] active:scale-[0.97]"
                        style={{ background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-primary)" }}>
                        Explore Problems <ChevronRight size={15} />
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div {...up(0.3)}
                    className="flex flex-wrap justify-center gap-x-10 gap-y-3 pt-5 border-t w-full max-w-xl"
                    style={{ borderColor: "var(--border-primary)" }}>
                    {[
                        { n: 500, s: "+", l: "Problems" },
                        { n: 50, s: "+", l: "Topics" },
                        { n: 10, s: "k+", l: "Devs" },
                        { n: 10, s: "+", l: "Languages" },
                    ].map(({ n, s, l }) => (
                        <div key={l} className="text-center">
                            <div className="text-xl sm:text-2xl font-extrabold tabular-nums" style={{ color: "var(--text-primary)" }}>
                                <Counter to={n} suffix={s} />
                            </div>
                            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>{l}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Feature pill strip */}
                <motion.div {...up(0.38)}
                    className="flex flex-wrap items-center justify-center gap-2">
                    {features.map((f) => (
                        <span key={f.label}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold"
                            style={{
                                background: "var(--bg-primary)",
                                borderColor: "var(--border-primary)",
                                color: "var(--text-secondary)",
                            }}>
                            <span style={{ color: "var(--text-tertiary)" }}>{f.icon}</span>
                            {f.label}
                        </span>
                    ))}
                </motion.div>

                {/* Supported languages — inline icons + names, no cards */}
                <motion.div {...up(0.68)} className="flex flex-col items-center gap-3 w-full">
                    <div className="w-48 h-px" style={{ background: "var(--border-primary)", opacity: 0.4 }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                        Supported Languages
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                        {langs.map((lang, i) => (
                            <motion.div key={lang.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.75 + i * 0.04 }}
                                className="flex items-center gap-1.5 cursor-default opacity-40 hover:opacity-80 transition-opacity"
                                style={{ color: "var(--text-secondary)" }}>
                                <lang.Icon size={14} />
                                <span className="text-xs font-semibold">{lang.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;