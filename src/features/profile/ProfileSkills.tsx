import { Star } from "lucide-react";

/* Static placeholder — replace with API data later */
const SKILLS = [
    "TypeScript", "Python", "Java", "C++",
    "Dynamic Programming", "Graph Theory", "Binary Search",
    "Trees", "Linked Lists", "Greedy",
];

function SkillBadge({ label }: { label: string }) {
    return (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium
                         bg-(--bg-secondary) dark:bg-(--dk-surface) border border-border/60
                         text-(--text-primary) dark:text-(--dk-text-dim)">
            {label}
        </span>
    );
}

export default function ProfileSkills() {
    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            <h2 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) mb-3 flex items-center gap-2">
                <Star size={15} className="text-primary" />
                Skills &amp; Languages
            </h2>
            <div className="flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                    <SkillBadge key={s} label={s} />
                ))}
            </div>
        </section>
    );
}
