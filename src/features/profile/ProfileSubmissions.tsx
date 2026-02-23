import { Code2 } from "lucide-react";

type SubmissionStatus = "Accepted" | "Wrong Answer" | "TLE";

interface Submission {
    title: string;
    lang: string;
    status: SubmissionStatus;
    time: string;
}

/* Static placeholder data — replace with API data later */
const RECENT_SUBMISSIONS: Submission[] = [
    { title: "Two Sum", lang: "TypeScript", status: "Accepted", time: "2h ago" },
    { title: "Longest Substring Without Repeating", lang: "TypeScript", status: "Accepted", time: "1d ago" },
    { title: "Median of Two Sorted Arrays", lang: "Java", status: "TLE", time: "2d ago" },
    { title: "Valid Parentheses", lang: "TypeScript", status: "Accepted", time: "3d ago" },
    { title: "Merge K Sorted Lists", lang: "Python", status: "Wrong Answer", time: "5d ago" },
];

const STATUS_COLOR: Record<SubmissionStatus, string> = {
    "Accepted": "text-emerald-500",
    "TLE": "text-amber-500",
    "Wrong Answer": "text-red-500",
};

function SubmissionRow({ title, lang, status, time }: Submission) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
            <div className="flex items-center gap-2 min-w-0">
                <Code2 size={13} className="shrink-0 text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                <span className="text-sm font-medium text-(--text-primary) dark:text-(--dk-text) truncate">
                    {title}
                </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-xs text-(--text-tertiary) dark:text-(--dk-text-faint) hidden sm:block">{lang}</span>
                <span className={`text-xs font-semibold ${STATUS_COLOR[status]}`}>{status}</span>
                <span className="text-xs text-(--text-tertiary) dark:text-(--dk-text-faint)">{time}</span>
            </div>
        </div>
    );
}

export default function ProfileSubmissions() {
    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            <h2 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) mb-3 flex items-center gap-2">
                <Code2 size={15} className="text-primary" />
                Recent Submissions
            </h2>
            {RECENT_SUBMISSIONS.map((s) => (
                <SubmissionRow key={s.title} {...s} />
            ))}
        </section>
    );
}
