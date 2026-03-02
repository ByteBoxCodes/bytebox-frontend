import { useState, useEffect } from "react";
import { format } from "date-fns";
import Editor from "@monaco-editor/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, XCircle, AlertTriangle, Clock, Check } from "lucide-react";
import type { ISubmissionResponse } from "@/types/submission";

interface SubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    submission: ISubmissionResponse | null;
}

const STATUS_CONFIG: Record<
    string,
    { label: string; color: string; icon: typeof CheckCircle2 }
> = {
    ACCEPTED: {
        label: "Accepted",
        color: "text-emerald-500 dark:text-emerald-400 border-emerald-500/50",
        icon: CheckCircle2,
    },
    WRONG_ANSWER: {
        label: "Wrong Answer",
        color: "text-rose-500 dark:text-rose-400 border-rose-500/50",
        icon: XCircle,
    },
    RUNTIME_ERROR: {
        label: "Runtime Error",
        color: "text-amber-500 dark:text-amber-400 border-amber-500/50",
        icon: AlertTriangle,
    },
    COMPILATION_ERROR: {
        label: "Compilation Error",
        color: "text-amber-500 dark:text-amber-400 border-amber-500/50",
        icon: AlertTriangle,
    },
    TIME_LIMIT_EXCEEDED: {
        label: "Time Limit Exceeded",
        color: "text-orange-500 dark:text-orange-400 border-orange-500/50",
        icon: Clock,
    },
};

export default function SubmissionModal({ isOpen, onClose, submission }: SubmissionModalProps) {
    const [isCopied, setIsCopied] = useState(false);
    console.log(submission)

    useEffect(() => {
        if (!isOpen) {
            setIsCopied(false);
        }
    }, [isOpen]);

    if (!submission) return null;

    const config = STATUS_CONFIG[submission.status] ?? STATUS_CONFIG.WRONG_ANSWER;
    const StatusIcon = config.icon;

    const formattedDate = format(new Date(submission.submittedAt), "MMM d, yyyy 'at' h:mm a");

    const handleCopy = async () => {
        if (submission.code) {
            await navigator.clipboard.writeText(submission.code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-(--bg-primary) border-(--border-primary) flex flex-col h-[85vh] sm:h-[80vh] rounded-xl shadow-2xl">
                {/* Top Header Section */}
                <div className="flex flex-col shrink-0">
                    <DialogHeader className="px-6 py-5 border-b border-(--border-primary) bg-(--bg-secondary) space-y-4">
                        <DialogTitle className="text-xl sm:text-2xl font-bold text-(--text-primary) tracking-tight">
                            {submission.problemTitle}
                        </DialogTitle>

                        {/* Compact Metadata Row */}
                        <div className="flex flex-wrap items-center gap-3 w-full">
                            {/* Status Badge */}
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${config.color} bg-current/10 shadow-sm`}>
                                <StatusIcon className="w-4 h-4" />
                                <span className="text-sm font-bold tracking-wide">{config.label}</span>
                            </div>

                            {/* Testcases Badge */}
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-(--bg-tertiary)/60 text-(--text-secondary) text-sm font-medium border border-(--border-primary) shadow-sm">
                                <span className="text-(--text-primary) font-bold">{submission.passedTestCases} <span className="text-(--text-tertiary)">/ {submission.totalTestCases}</span></span>
                                <span className="text-xs uppercase tracking-wider text-(--text-tertiary)">Testcases</span>
                            </div>

                            {/* Language Badge */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-(--bg-tertiary)/60 text-(--text-primary) text-sm font-bold uppercase tracking-wider border border-(--border-primary) shadow-sm">
                                {submission.language === "cpp" ? "C++" : submission.language}
                            </div>

                            {/* Spacer to push timestamp to the right on desktop */}
                            <div className="flex-1 hidden sm:block" />

                            {/* Timestamp */}
                            <div className="flex items-center gap-1.5 text-xs text-(--text-tertiary) font-medium bg-(--bg-primary) px-3 py-1.5 rounded-md border border-(--border-primary)">
                                <Clock className="w-3.5 h-3.5" />
                                {formattedDate}
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Toolbar above the editor */}
                    <div className="flex items-center justify-between px-6 py-2 border-b border-(--border-primary) bg-(--bg-tertiary)/40">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                            </div>
                            <span className="ml-2 text-xs font-bold text-(--text-secondary) tracking-widest uppercase">Source Code</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 gap-2 text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) rounded-md transition-colors"
                            onClick={handleCopy}
                            disabled={!submission.code}
                        >
                            {isCopied ? (
                                <>
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    <span className="text-emerald-500 font-semibold text-xs">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    <span className="font-semibold text-xs">Copy Code</span>
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Main Code Editor Body */}
                <div className="flex-1 w-full bg-[#1e1e1e] relative min-h-0">

                    {submission.code ? (
                        <Editor
                            theme="vs-dark"
                            height="100%"
                            language={submission.language === "c++" ? "cpp" : submission.language}
                            value={submission.code}
                            options={{
                                readOnly: true,
                                fontSize: 14,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                padding: { top: 24, bottom: 24 },
                                wordWrap: "on",
                                domReadOnly: true,
                                fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                                fontLigatures: true,
                                renderLineHighlight: "none",
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full w-full text-sm text-(--text-tertiary) italic bg-(--bg-primary)">
                            No code available for this submission.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
