import { useGetMySubmissions } from "@/hooks/useGetMySubmissions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import SubmissionHistorySkeleton from "@/fallback/SubmissionHistorySkeleton";
import type { ISubmissionResponse } from "@/types/submission";

const STATUS_CONFIG: Record<
    string,
    { label: string; color: string; icon: typeof CheckCircle2 }
> = {
    ACCEPTED: {
        label: "Accepted",
        color: "text-emerald-500 dark:text-emerald-400",
        icon: CheckCircle2,
    },
    WRONG_ANSWER: {
        label: "Wrong Answer",
        color: "text-rose-500 dark:text-rose-400",
        icon: XCircle,
    },
    RUNTIME_ERROR: {
        label: "Runtime Error",
        color: "text-amber-500 dark:text-amber-400",
        icon: AlertTriangle,
    },
    COMPILATION_ERROR: {
        label: "Compilation Error",
        color: "text-amber-500 dark:text-amber-400",
        icon: AlertTriangle,
    },
    TIME_LIMIT_EXCEEDED: {
        label: "Time Limit Exceeded",
        color: "text-orange-500 dark:text-orange-400",
        icon: Clock,
    },
};

function formatRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return "just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
}

function SubmissionRow({ submission, onClick }: { submission: ISubmissionResponse; onClick: () => void }) {
    const config = STATUS_CONFIG[submission.status] ?? STATUS_CONFIG.WRONG_ANSWER;
    const StatusIcon = config.icon;
    const isAccepted = submission.status === "ACCEPTED";

    return (
        <div
            onClick={onClick}
            className="group flex items-center gap-4 px-5 py-3.5 border-b border-(--border-primary) dark:border-(--dk-border) hover:bg-(--bg-tertiary)/50 dark:hover:bg-white/3 transition-colors cursor-pointer"
        >
            {/* Status icon + label */}
            <div className="flex items-center gap-2 min-w-[160px]">
                <StatusIcon className={`w-4 h-4 shrink-0 ${config.color}`} />
                <span className={`text-[13px] font-semibold ${config.color}`}>
                    {config.label}
                </span>
            </div>

            {/* Language */}
            <span className="text-[12px] font-mono px-2 py-0.5 rounded bg-(--bg-tertiary) dark:bg-white/6 text-(--text-secondary) uppercase tracking-wider min-w-[50px] text-center">
                {submission.language === "cpp" ? "C++" : submission.language}
            </span>

            {/* Test cases */}
            <div className="flex items-center gap-1.5 min-w-[100px]">
                <span
                    className={`text-[13px] font-medium ${isAccepted ? "text-emerald-500 dark:text-emerald-400" : "text-(--text-secondary)"}`}
                >
                    {submission.passedTestCases}/{submission.totalTestCases}
                </span>
                <span className="text-[11px] text-(--text-tertiary)">passed</span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Time */}
            <span className="text-[12px] text-(--text-tertiary) tabular-nums">
                {formatRelativeTime(submission.submittedAt)}
            </span>
        </div>
    );
}

import SubmissionModal from "./SubmissionModal";
import { useState } from "react";

export default function SubmissionHistory({ problemId }: { problemId: string }) {
    const { data: submissions, isLoading, isError } = useGetMySubmissions(problemId);
    const [selectedSubmission, setSelectedSubmission] = useState<ISubmissionResponse | null>(null);

    if (isLoading) {
        return <SubmissionHistorySkeleton />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-(--text-tertiary) space-y-2 p-6 text-center">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
                <p className="text-sm font-medium text-(--text-secondary)">Failed to load submissions</p>
            </div>
        );
    }

    if (!submissions || submissions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-(--text-tertiary) space-y-3 p-6 text-center">
                <div className="p-4 bg-(--bg-secondary) rounded-full">
                    <Terminal className="w-8 h-8 opacity-50" />
                </div>
                <p className="font-medium text-(--text-secondary)">No submissions yet</p>
                <p className="text-sm max-w-[250px]">Write and submit your first solution using the editor on the right.</p>
            </div>
        );
    }

    const sorted = [...submissions].sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    );

    return (
        <ScrollArea className="h-full">
            {/* Table header */}
            <div className="flex items-center gap-4 px-5 py-2.5 border-b border-(--border-primary) dark:border-(--dk-border) bg-(--bg-primary) dark:bg-(--bg-secondary) sticky top-0 z-10">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-(--text-tertiary) min-w-[160px]">Status</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-(--text-tertiary) min-w-[50px] text-center">Lang</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-(--text-tertiary) min-w-[100px]">Tests</span>
                <div className="flex-1" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-(--text-tertiary)">Submitted</span>
            </div>

            {/* Rows — latest first */}
            {sorted.map((submission) => (
                <SubmissionRow
                    key={submission.id}
                    submission={submission}
                    onClick={() => setSelectedSubmission(submission)}
                />
            ))}

            <SubmissionModal
                isOpen={!!selectedSubmission}
                onClose={() => setSelectedSubmission(null)}
                submission={selectedSubmission}
            />
        </ScrollArea>
    );
}
