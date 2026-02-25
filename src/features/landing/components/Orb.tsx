import { motion } from "framer-motion";

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

export default Orb;
