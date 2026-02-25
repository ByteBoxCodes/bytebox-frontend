import { useEffect, useState } from "react";

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

export default Counter;
