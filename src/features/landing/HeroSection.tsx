import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { avatars, langs, features } from "./data/heroData";
import Counter from "./components/Counter";
import Orb from "./components/Orb";
import AnimatedHeadline from "./components/AnimatedHeadline";
import Spotlight from "./components/Spotlight";
import TechBackgroundPatterns from "./components/TechBackgroundPatterns";

const HeroSection = () => {
    const up = (delay = 0) => ({
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <div
            className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16 md:py-0 w-full"
            style={{
                background: "var(--bg-secondary)",
            }}
        >
            {/* Floating orbs */}
            <Orb x="10%" y="15%" size={260} delay={0} />
            <Orb x="70%" y="10%" size={200} delay={3.5} />
            <Orb x="55%" y="65%" size={180} delay={7} />
            <Orb x="5%" y="60%" size={150} delay={2} />

            {/* ── Tech Background Patterns — left & right ── */}
            <TechBackgroundPatterns />

            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, var(--text-secondary) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    opacity: 0.05,
                }} />

            {/* Mouse spotlight */}
            <Spotlight />

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto w-full gap-5 md:gap-6 mt-8 md:mt-0">

                {/* Social proof pill */}
                <motion.div {...up(0)} className="flex flex-col sm:flex-row items-center gap-3 md:gap-2.5">
                    <div className="flex -space-x-2">
                        {avatars.map((src, i) => (
                            <motion.img key={i} src={src} alt=""
                                className="size-8 rounded-full ring-1 object-cover"
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i, duration: 0.4 }} />
                        ))}
                    </div>
                    <motion.span
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold"
                        style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-secondary)" }}
                        whileHover={{ scale: 1.04 }}
                    >
                        <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                        />
                        Join 100+ developers already coding
                    </motion.span>
                </motion.div>

                {/* Animated headline */}
                <AnimatedHeadline />

                {/* Subtitle */}
                <motion.p {...up(0.52)}
                    className="text-sm sm:text-base leading-relaxed max-w-xl mb-2"
                    style={{ color: "var(--text-tertiary)" }}>
                    Solve curated coding challenges across 50+ topics — from basic conditionals to advanced algorithms.
                    Instant feedback. Real-time judge. Track your progress.
                </motion.p>

                {/* CTAs */}
                <motion.div {...up(0.6)} className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                        <Link to="/problems"
                            className="inline-flex justify-center w-full sm:w-auto items-center gap-2 px-7 py-3 text-sm font-bold rounded-full relative overflow-hidden"
                            style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}>
                            {/* shimmer sweep */}
                            <motion.span
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.13) 50%, transparent 60%)",
                                    backgroundSize: "200% 100%",
                                }}
                                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                            />
                            Start Coding — Free
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                        <Link to="/"
                            className="inline-flex justify-center w-full sm:w-auto items-center gap-1 px-7 py-3 text-sm font-bold rounded-full border transition-colors duration-150"
                            style={{ background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-primary)" }}>
                            Explore More <ChevronRight size={15} />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div {...up(0.68)}
                    className="grid grid-cols-2 md:grid-cols-4 justify-center gap-x-6 gap-y-6 pt-6 border-t w-full max-w-xl mt-4"
                    style={{ borderColor: "var(--border-primary)" }}>
                    {[
                        { n: 500, s: "+", l: "Problems" },
                        { n: 50, s: "+", l: "Topics" },
                        { n: 100, s: "+", l: "Devs" },
                        { n: 10, s: "+", l: "Languages" },
                    ].map(({ n, s, l }, i) => (
                        <motion.div key={l} className="text-center"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + i * 0.07, duration: 0.4 }}>
                            <div className="text-xl sm:text-2xl font-extrabold tabular-nums" style={{ color: "var(--text-primary)" }}>
                                <Counter to={n} suffix={s} />
                            </div>
                            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>{l}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Feature pills */}
                <motion.div className="flex flex-wrap items-center justify-center gap-2 mt-2"
                    initial="hidden" animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.78 } } }}>
                    {features.map((f) => (
                        <motion.span key={f.label}
                            variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
                            transition={{ type: "spring", stiffness: 200, damping: 18 }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold cursor-default whitespace-nowrap"
                            style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-secondary)" }}>
                            <span style={{ color: "var(--text-tertiary)" }}>{f.icon}</span>
                            {f.label}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Language strip */}
                <motion.div
                    initial="hidden" animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 1.0 } } }}
                    className="flex flex-col items-center gap-2.5 w-full mt-4 md:mt-2">
                    <div className="w-32 md:w-40 h-px" style={{ background: "var(--border-primary)", opacity: 0.4 }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-center" style={{ color: "var(--text-tertiary)" }}>
                        Supported Languages
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 md:gap-x-5 md:gap-y-1.5">
                        {langs.map((lang) => (
                            <motion.div key={lang.name}
                                variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                                whileHover={{ scale: 1.15, opacity: 0.9 }}
                                className="flex items-center gap-1.5 cursor-default"
                                style={{ color: "var(--text-secondary)", opacity: 0.45 }}>
                                <lang.Icon size={12} className="md:w-[13px] md:h-[13px]" />
                                <span className="text-[11px] md:text-xs font-semibold whitespace-nowrap">{lang.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;