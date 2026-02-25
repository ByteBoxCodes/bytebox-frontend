import { motion } from "framer-motion";

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

export default AnimatedHeadline;
