import { motion } from "framer-motion";

const TechBackgroundPatterns = () => {
    return (
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
    );
};

export default TechBackgroundPatterns;
