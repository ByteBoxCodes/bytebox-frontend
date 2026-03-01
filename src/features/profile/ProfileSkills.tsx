import { Star } from "lucide-react";

/* Static placeholder — replace with API data later */

function SkillBadge({ label }: { label: string }) {
    return (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium
                         bg-(--bg-secondary) dark:bg-(--dk-surface) border border-border/60
                         text-(--text-primary) dark:text-(--dk-text-dim) capitalize">
            {label}
        </span>
    );
}

export default function ProfileSkills({ languages }: { languages: string[] }) {
    return (
        <div className="px-1 text-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted) mb-3 flex items-center gap-2">
                <Star size={14} /> Skills &amp; Languages
            </p>
            <div className="flex flex-wrap gap-1.5">
                {languages.map((s) => (
                    <SkillBadge key={s} label={s} />
                ))}
            </div>
        </div>
    );
}
