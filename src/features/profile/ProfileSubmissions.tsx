import { Code2 } from "lucide-react";
import ProfileSubmissionsSkeleton from "@/fallback/ProfileSubmissionsSkeleton";
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

function SubmissionRow({ submission, onClick }: { submission: ISubmissionResponse; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0 cursor-pointer hover:bg-(--bg-tertiary)/50 dark:hover:bg-white/3 transition-colors px-2 -mx-2 rounded"
        >
            <div className="flex items-center gap-2 min-w-0">
                <Code2 size={13} className="shrink-0 text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                <span className="text-sm font-medium text-(--text-primary) dark:text-(--dk-text) truncate" title={submission.problemTitle}>
                    {submission.problemTitle}
                </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-xs text-(--text-tertiary) dark:text-(--dk-text-faint) hidden sm:block">
                    {submission.language.charAt(0).toUpperCase() + submission.language.slice(1).toLowerCase()}
                </span>
                <span className={`text-xs font-semibold ${STATUS_COLOR[submission.status] || "text-gray-500"}`}>
                    {STATUS_LABEL[submission.status] || submission.status}
                </span>
                <span className="text-xs text-(--text-tertiary) dark:text-(--dk-text-faint)">
                    {formatTimeAgo(submission.submittedAt)}
                </span>
            </div>
        </div>
    );
}

import SubmissionModal from "../submission/SubmissionModal";
import { useState } from "react";

export default function ProfileSubmissions() {
    const { data: submissions, isLoading, isError } = useGetMySubmissionByUserId();
    const [selectedSubmission, setSelectedSubmission] = useState<ISubmissionResponse | null>(null);

    return (
        <section className="rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">
            <h2 className="text-sm font-semibold text-(--text-primary) dark:text-(--dk-text) mb-3 flex items-center gap-2">
                <Code2 size={15} className="text-primary" />
                Recent Submissions
            </h2>

            {isLoading ? (
                <ProfileSubmissionsSkeleton />
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
                    <SubmissionRow
                        key={s.id}
                        submission={s}
                        onClick={() => setSelectedSubmission(s)}
                    />
                ))
            )}

            <SubmissionModal
                isOpen={!!selectedSubmission}
                onClose={() => setSelectedSubmission(null)}
                submission={selectedSubmission}
            />
        </section>
    );
}
