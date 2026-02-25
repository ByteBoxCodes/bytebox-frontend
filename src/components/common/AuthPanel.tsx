
import { motion } from "framer-motion";

interface AuthPanelProps {
    mode?: "login" | "register";
}

export default function AuthPanel({ mode = "login" }: AuthPanelProps) {
    const isLogin = mode === "login";

    const eyebrow = isLogin ? "Welcome Back to ByteBox" : "Join ByteBox";
    const heading = (
        <>
            {isLogin ? "Login to your account." : "Register for free."}
            <br />
            <span className="text-[2rem] leading-tight xl:text-4xl text-(--text-secondary) dark:text-(--dk-text-muted) font-semibold mt-2 block">
                Mastering coding fundamentals.
            </span>
        </>
    );
    const description = isLogin
        ? "Sharpen your problem-solving skills with curated challenges, detailed explanations, and a community of passionate developers."
        : "Create your free account and get instant access to 500+ coding challenges, real-time feedback, and a global leaderboard.";
    const tagline = "© 2025 ByteBox — Built for developers, by developers.";

    const up = (delay = 0) => ({
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <div className="hidden lg:flex w-1/2 bg-(--bg-secondary) relative flex-col justify-center p-12 overflow-hidden z-10
                        border-r border-(--border-primary) dark:border-(--dk-border)">

            {/* Background Patterns */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Dark mode pattern */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 hidden dark:block"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }} />
                <div className="absolute inset-0 hidden dark:block"
                    style={{
                        background: "linear-gradient(to bottom right, transparent, var(--bg-secondary) 80%)"
                    }} />
            </div>

            {/* Headline + description */}
            <div className="z-10 relative flex flex-col gap-6 -mt-32">
                <div>
                    <motion.p {...up(0)} className="text-sm font-semibold uppercase tracking-widest mb-3
                                  text-(--text-secondary) dark:text-(--dk-text-muted)">
                        {eyebrow}
                    </motion.p>
                    <motion.h1 {...up(0.1)} className="text-4xl xl:text-5xl font-extrabold leading-tight
                                   text-(--text-primary) dark:text-(--dk-text)">
                        {heading}
                    </motion.h1>
                    <motion.p {...up(0.2)} className="mt-4 text-base leading-relaxed max-w-sm
                                  text-(--text-secondary) dark:text-(--dk-text-muted)">
                        {description}
                    </motion.p>
                </div>

                {/* Security / Auth Animated Patterns - Pulled to bottom right corner */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute -bottom-80 -right-20 size-[500px] pointer-events-none opacity-40 dark:opacity-30">

                    <svg viewBox="0 0 400 400" className="opacity-30 w-full h-full text-(--text-primary) dark:text-(--dk-text)" fill="none" xmlns="http://www.w3.org/2000/svg ">

                        {/* Orbiting rings */}
                        <motion.circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8"
                            animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ originX: "200px", originY: "200px" }} />
                        <motion.circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" opacity="0.6"
                            animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ originX: "200px", originY: "200px" }} />


                        {/* Fingerprint / Data lines around */}
                        <motion.path d="M90 200 Q70 140 120 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }} />
                        <motion.path d="M310 200 Q330 260 280 300" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: "reverse" }} />

                        {/* Encryption grid floating out */}
                        <motion.g animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.9, 1.05, 0.9] }} transition={{ duration: 5, repeat: Infinity }}>
                            {[...Array(5)].map((_, i) => (
                                <g key={i}>
                                    <rect x="50" y={80 + i * 20} width="4" height="4" fill="currentColor" />
                                    <rect x="70" y={80 + i * 20} width="4" height="4" fill="currentColor" opacity="0.5" />
                                    <rect x="90" y={80 + i * 20} width="4" height="4" fill="currentColor" />
                                </g>
                            ))}
                        </motion.g>

                        <motion.g animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.9, 1.05, 0.9] }} transition={{ duration: 5, delay: 2.5, repeat: Infinity }}>
                            {[...Array(5)].map((_, i) => (
                                <g key={i}>
                                    <rect x="300" y={220 + i * 20} width="4" height="4" fill="currentColor" opacity="0.5" />
                                    <rect x="320" y={220 + i * 20} width="4" height="4" fill="currentColor" />
                                    <rect x="340" y={220 + i * 20} width="4" height="4" fill="currentColor" opacity="0.5" />
                                </g>
                            ))}
                        </motion.g>

                        {/* Connection Nodes */}
                        <motion.path d="M140 280 L100 320" stroke="currentColor" strokeDasharray="4 4" opacity="0.4"
                            initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
                        <motion.path d="M260 80 L300 40" stroke="currentColor" strokeDasharray="4 4" opacity="0.4"
                            initial={{ strokeDashoffset: -100 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />

                        <circle cx="100" cy="320" r="6" stroke="currentColor" strokeWidth="2" fill="var(--bg-secondary)" />
                        <circle cx="100" cy="320" r="2" fill="currentColor" />

                        <circle cx="300" cy="40" r="6" stroke="currentColor" strokeWidth="2" fill="var(--bg-secondary)" />
                        <circle cx="300" cy="40" r="2" fill="currentColor" />

                        {/* Pulsing rings around shield */}
                        <motion.circle cx="200" cy="180" r="90" stroke="currentColor" strokeWidth="1" opacity="0" fill="none"
                            animate={{ scale: [0.8, 1.2], opacity: [0, 0.2, 0] }} transition={{ duration: 3, repeat: Infinity }} />
                        <motion.circle cx="200" cy="180" r="90" stroke="currentColor" strokeWidth="1" opacity="0" fill="none"
                            animate={{ scale: [0.8, 1.2], opacity: [0, 0.2, 0] }} transition={{ duration: 3, delay: 1.5, repeat: Infinity }} />

                    </svg>
                </motion.div>
            </div>

            {/* Tagline */}
            <motion.p {...up(0.4)} className="absolute bottom-8 left-12 z-10 text-xs select-none text-(--text-secondary) dark:text-(--dk-text-faint)">
                {tagline}
            </motion.p>
        </div>
    );
}
