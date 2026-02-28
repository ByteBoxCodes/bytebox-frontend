import { Code2, Loader2 } from "lucide-react";
import { useGetMySubmissionByUserId } from "@/hooks/useGetMySubmissions";
import type { ISubmissionResponse } from "@/types/submission";

const STATUS_COLOR: Record<string, string> = {
    "ACCEPTED": "text-emerald-500",
    "TIME_LIMIT_EXCEEDED": "text-amber-500",
    "WRONG_ANSWER": "text-red-500",
    "RUNTIME_ERROR": "text-red-500",
    "COMPILATION_ERROR": "text-red-500",
};

const STATUS_LABEL: Record<string, string> = {
    "ACCEPTED": "Accepted",
    "TIME_LIMIT_EXCEEDED": "TLE",
    "WRONG_ANSWER": "Wrong Answer",
    "RUNTIME_ERROR": "Runtime Error",
    "COMPILATION_ERROR": "Compilation Error",
};

function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
}

function SubmissionRow({ problemTitle, language, status, submittedAt }: ISubmissionResponse) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
            <div className="flex items-center gap-2 min-w-0">
                <Code2 size={13} className="shrink-0 text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                <span className="text-sm font-medium text-(--text-primary) dark:text-(--dk-text) truncate" title={problemTitle}>
                    {problemTitle}
                </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-xs text-(--text-tertiary) dark:text-(--dk-text-faint) hidden sm:block">
                    {language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()}
                </span>
                <span className={`text-xs font-semibold ${STATUS_COLOR[status] || "text-gray-500"}`}>
                    {STATUS_LABEL[status] || status}
                </span>
                <span className="text-xs text-(--text-tertiary) dark:text-(--dk-text-faint)">
                    {formatTimeAgo(submittedAt)}
                </span>
            </div>
        </div>
    );
}

export default function ProfileSubmissions() {
    const { data: submissions, isLoading, isError } = useGetMySubmissionByUserId();

    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            <h2 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) mb-3 flex items-center gap-2">
                <Code2 size={15} className="text-primary" />
                Recent Submissions
            </h2>

            {isLoading ? (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            ) : isError ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                    Failed to load recent submissions
                </div>
            ) : !submissions || submissions.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                    No recent submissions
                </div>
            ) : (
                [...submissions].reverse().slice(0, 5).map((s) => (
                    <SubmissionRow key={s.id} {...s} />
                ))
            )}
        </section>
    );
}
