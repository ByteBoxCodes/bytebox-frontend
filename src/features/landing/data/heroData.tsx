
import { Zap, Trophy, Clock, BookOpen } from "lucide-react";
import { SiPython, SiCplusplus } from "react-icons/si";
import { FaJava, FaC } from "react-icons/fa6";

export const avatars = [
    "https://i.pravatar.cc/40?img=1",
    "https://i.pravatar.cc/40?img=12",
    "https://i.pravatar.cc/40?img=33",
];

export const langs = [
    { name: "C", Icon: FaC },
    { name: "C++", Icon: SiCplusplus },
    { name: "Java", Icon: FaJava },
    { name: "Python", Icon: SiPython },
];

export const features = [
    { icon: <Zap size={13} />, label: "Real-time Feedback" },
    { icon: <Clock size={13} />, label: "Progress Tracking" },
    { icon: <BookOpen size={13} />, label: "Structured Curriculum" },
    { icon: <Trophy size={13} />, label: "Interview Prep" },
];
