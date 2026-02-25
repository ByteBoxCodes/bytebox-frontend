import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Zap, Trophy, Clock, BookOpen } from "lucide-react";
import {
    SiPython, SiJavascript, SiCplusplus,
} from "react-icons/si";
import { FaJava, FaC } from "react-icons/fa6";

/* ─── Avatars ─── */
const avatars = [
    "https://i.pravatar.cc/40?img=1",
    "https://i.pravatar.cc/40?img=12",
    "https://i.pravatar.cc/40?img=33",
];

/* ─── Languages ─── */
const langs = [
    { name: "C", Icon: FaC },
    { name: "C++", Icon: SiCplusplus },
    { name: "Java", Icon: FaJava },
    { name: "Python", Icon: SiPython },
    { name: "JavaScript", Icon: SiJavascript },
];

/* ─── Feature pills ─── */
const features = [
    { icon: <Zap size={13} />, label: "Real-time Feedback" },
    { icon: <Clock size={13} />, label: "Progress Tracking" },
    { icon: <BookOpen size={13} />, label: "Structured Curriculum" },
    { icon: <Trophy size={13} />, label: "Interview Prep" },
];


/* ─── Animated counter ─── */
const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
    const [n, setN] = useState(0);
    useEffect(() => {
        let cur = 0; const step = to / 60;
        const t = setInterval(() => {
            cur += step;
            if (cur >= to) { setN(to); clearInterval(t); } else setN(Math.floor(cur));
        }, 2200 / 60);
        return () => clearInterval(t);
    }, [to]);
    return <>{n}{suffix}</>;
};

/* ─── Floating orb ─── */
const Orb = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
            left: x, top: y, width: size, height: size,
            background: "var(--text-secondary)",
            filter: `blur(${size * 0.55}px)`,
            opacity: 0,
        }}
        animate={{ opacity: [0.04, 0.09, 0.04], scale: [1, 1.2, 1], x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 12 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
);

/* ─── Animated headline words ─── */
const AnimatedHeadline = () => {
    const line1 = ["Master", "Programming"];
    const line2 = ["Fundamentals", "with", "ByteBox"];

    const word = (text: string, i: number, dim = false) => (
        <motion.span
            key={text + i}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block", marginRight: "0.28em", color: dim ? "var(--text-secondary)" : "var(--text-primary)" }}
        >
            {text}
        </motion.span>
    );

    return (
        <h1 className="font-black tracking-tight leading-[1.07]"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)" }}>
            <div>{line1.map((w, i) => word(w, i))}</div>
            <div>{line2.map((w, i) => word(w, i + line1.length, true))}</div>
        </h1>
    );
};

/* ─── Mouse spotlight ─── */
const Spotlight = () => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [mouseX, mouseY]);

    const bg = useTransform(
        [springX, springY],
        ([x, y]: number[]) =>
            `radial-gradient(380px circle at ${x}px ${y}px, rgba(255,255,255,0.045), transparent 70%)`
    );

    return (
        <motion.div
            ref={ref}
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{ background: bg }}
        />
    );
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
            {/* Floating orbs */}
            <Orb x="10%" y="15%" size={260} delay={0} />
            <Orb x="70%" y="10%" size={200} delay={3.5} />
            <Orb x="55%" y="65%" size={180} delay={7} />
            <Orb x="5%" y="60%" size={150} delay={2} />

            {/* ── Tech Background Patterns — left & right ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden hidden xl:block z-0">
                {/* Left Pattern - Nodes & Connections */}
                <motion.svg className="absolute top-0 left-[-5%] h-full w-[400px] opacity-10" style={{ color: "var(--text-primary)" }} viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path d="M50 150 L150 250 L150 400 L50 500" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
                    <motion.path d="M150 250 L300 150 M150 400 L250 550" stroke="currentColor" strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />

                    {/* Array Structure */}
                    <g transform="translate(60, 80)">
                        <rect x="0" y="0" width="30" height="30" stroke="currentColor" strokeWidth="2" fill="none" />
                        <rect x="30" y="0" width="30" height="30" stroke="currentColor" strokeWidth="2" fill="none" />
                        <rect x="60" y="0" width="30" height="30" stroke="currentColor" strokeWidth="2" fill="none" />
                        <rect x="90" y="0" width="30" height="30" stroke="currentColor" strokeWidth="2" fill="none" />
                        <motion.rect x="0" y="0" width="30" height="30" fill="currentColor" opacity="0.2"
                            animate={{ x: [0, 30, 60, 90, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                        <motion.path d="M15 45 L15 35 M10 40 L15 35 L20 40" stroke="currentColor" strokeWidth="2"
                            animate={{ x: [0, 30, 60, 90, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                    </g>

                    {/* Stack Structure */}
                    <g transform="translate(250, 600)">
                        <path d="M0 0 V60 H50 V0" stroke="currentColor" strokeWidth="2" fill="none" />
                        <motion.rect x="5" y="40" width="40" height="15" fill="currentColor" opacity="0.6" />
                        <motion.rect x="5" y="20" width="40" height="15" fill="currentColor" opacity="0.8" />
                        <motion.rect x="5" y="0" width="40" height="15" fill="currentColor" opacity="1"
                            initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "anticipate" }} />
                    </g>

                    {/* Binary Tree Structure */}
                    <g transform="translate(40, 650)">
                        <circle cx="50" cy="0" r="12" stroke="currentColor" strokeWidth="2" fill="none" />
                        <circle cx="20" cy="40" r="12" stroke="currentColor" strokeWidth="2" fill="none" />
                        <circle cx="80" cy="40" r="12" stroke="currentColor" strokeWidth="2" fill="none" />
                        <motion.path d="M42 9 L28 31" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} />
                        <motion.path d="M58 9 L72 31" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
                    </g>

                    {/* Pulsing Nodes */}
                    {[
                        { cx: 50, cy: 150, r: 4, d: 0 }, { cx: 150, cy: 250, r: 6, d: 1 },
                        { cx: 150, cy: 400, r: 6, d: 2 }, { cx: 50, cy: 500, r: 4, d: 3 },
                        { cx: 300, cy: 150, r: 4, d: 1.5 }, { cx: 250, cy: 550, r: 4, d: 2.5 }
                    ].map((node, i) => (
                        <motion.circle key={i} cx={node.cx} cy={node.cy} r={node.r} fill="currentColor"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, delay: node.d, repeat: Infinity, ease: "easeInOut" }} />
                    ))}

                    <motion.rect x="135" y="235" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="2" fill="none"
                        animate={{ rotate: [0, 90] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ originX: "150px", originY: "250px" }} />

                    {/* Floating decorators */}
                    <motion.path d="M80 650 H120 M100 630 V670" stroke="currentColor" strokeWidth="4"
                        animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
                    <motion.circle cx="300" cy="700" r="20" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4"
                        animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ originX: "300px", originY: "700px" }} />
                    <motion.path d="M50 50 L100 50 L100 100" stroke="currentColor" strokeWidth="2" fill="none"
                        animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 3, repeat: Infinity }} />
                </motion.svg>

                {/* Right Pattern - Database & Flowcharts */}
                <motion.svg className="absolute top-0 right-[-5%] h-full w-[400px] opacity-10" style={{ color: "var(--text-primary)" }} viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Database cylinders */}
                    <motion.g animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                        <ellipse cx="250" cy="200" rx="40" ry="15" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M210 200 V240 A40 15 0 0 0 290 240 V200" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M210 240 V280 A40 15 0 0 0 290 280 V240" stroke="currentColor" strokeWidth="2" fill="none" />
                    </motion.g>

                    {/* Flowchart Structure */}
                    <g transform="translate(100, 50)">
                        <rect x="0" y="0" width="80" height="30" rx="15" stroke="currentColor" strokeWidth="2" fill="none" />
                        <polygon points="40,50 70,70 40,90 10,70" stroke="currentColor" strokeWidth="2" fill="none" />
                        <rect x="120" y="55" width="60" height="30" stroke="currentColor" strokeWidth="2" fill="none" />
                        <motion.path d="M40 30 V50 M35 45 L40 50 L45 45" stroke="currentColor" strokeWidth="2"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <motion.path d="M70 70 H120 M115 65 L120 70 L115 75" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.75, repeat: Infinity }} />
                        <motion.path d="M40 90 V110" stroke="currentColor" strokeWidth="2"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 1.5, repeat: Infinity }} />
                    </g>

                    {/* Connection lines */}
                    <motion.path d="M150 350 L250 295 M250 450 L250 350" stroke="currentColor" strokeWidth="2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />

                    <motion.circle cx="250" cy="350" r="6" fill="currentColor" animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
                    <motion.circle cx="150" cy="350" r="4" fill="currentColor" animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />

                    {/* Logic Gate shape */}
                    <motion.path d="M100 450 V550 Q200 550 200 500 Q200 450 100 450" stroke="currentColor" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0, opacity: 0.2 }} animate={{ pathLength: 1, opacity: 0.6 }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }} />
                    <circle cx="210" cy="500" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <motion.path d="M60 480 H100 M60 520 H100 M220 500 H280" stroke="currentColor" strokeWidth="2"
                        animate={{ x: [-5, 0, -5], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />

                    {/* Decorators */}
                    <motion.rect x="50" y="300" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(45 70 320)"
                        animate={{ rotate: 135 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ originX: "70px", originY: "320px" }} />
                    <motion.g animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <rect x="300" y="650" width="10" height="10" fill="currentColor" />
                        <rect x="320" y="650" width="10" height="10" fill="currentColor" />
                        <rect x="300" y="670" width="10" height="10" fill="currentColor" />
                    </motion.g>
                    <motion.path d="M200 750 L250 700 L300 750" stroke="currentColor" strokeWidth="2" fill="none"
                        animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                </motion.svg>
            </div>

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
            <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto w-full gap-5">

                {/* Social proof pill */}
                <motion.div {...up(0)} className="flex items-center gap-2.5">
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
                            className="w-1.5 h-1.5 rounded-full bg-emerald-500"
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
                    className="text-sm sm:text-base leading-relaxed max-w-xl"
                    style={{ color: "var(--text-tertiary)" }}>
                    Solve curated coding challenges across 50+ topics — from basic conditionals to advanced algorithms.
                    Instant feedback. Real-time judge. Track your progress.
                </motion.p>

                {/* CTAs */}
                <motion.div {...up(0.6)} className="flex flex-wrap items-center justify-center gap-3">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Link to="/problems"
                            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold rounded-full relative overflow-hidden"
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
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Link to="/"
                            className="inline-flex items-center gap-1 px-7 py-3 text-sm font-bold rounded-full border transition-colors duration-150"
                            style={{ background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-primary)" }}>
                            Explore More <ChevronRight size={15} />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div {...up(0.68)}
                    className="flex flex-wrap justify-center gap-x-10 gap-y-3 pt-4 border-t w-full max-w-xl"
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
                <motion.div className="flex flex-wrap items-center justify-center gap-2"
                    initial="hidden" animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.78 } } }}>
                    {features.map((f) => (
                        <motion.span key={f.label}
                            variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
                            transition={{ type: "spring", stiffness: 200, damping: 18 }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold cursor-default"
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
                    className="flex flex-col items-center gap-2.5 w-full">
                    <div className="w-40 h-px" style={{ background: "var(--border-primary)", opacity: 0.4 }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                        Supported Languages
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
                        {langs.map((lang) => (
                            <motion.div key={lang.name}
                                variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                                whileHover={{ scale: 1.15, opacity: 0.9 }}
                                className="flex items-center gap-1.5 cursor-default"
                                style={{ color: "var(--text-secondary)", opacity: 0.45 }}>
                                <lang.Icon size={13} />
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