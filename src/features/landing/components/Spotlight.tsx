import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

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
            className="absolute inset-0 pointer-events-none z-1"
            style={{ background: bg }}
        />
    );
};

export default Spotlight;
