const formatText = (text: string | null | undefined) => {
    if (!text) return text;
    return String(text).replace(/(?:\\n|\n)/g, '\n').trim();
};

interface TestCaseDetailProps {
    input: string;
    expectedOutput: string;
    userOutput: string | null | undefined;
    isPassed?: boolean;
}

export default function TestCaseDetail({
    input,
    expectedOutput,
    userOutput,
    isPassed,
}: TestCaseDetailProps) {
    return (
        <div className="space-y-3 animate-in fade-in duration-200 mb-10">
            {/* Input */}
            {input && (
                <div className="space-y-1.5">
                    <p className="text-[11px] text-(--text-tertiary) font-bold uppercase tracking-wider">
                        Input
                    </p>
                    <div className="px-3 py-2.5 rounded-md bg-(--bg-primary) font-mono text-sm text-(--text-primary) border border-(--border-primary) whitespace-pre-wrap">
                        {formatText(input)}
                    </div>
                </div>
            )}

            {/* Your Output */}
            <div className="space-y-1.5">
                <p
                    className={`text-[11px] font-bold uppercase tracking-wider ${isPassed ? "text-emerald-400/80" : "text-rose-400/80"
                        }`}
                >
                    Your Output
                </p>
                <div
                    className={`px-3 py-2.5 rounded-md font-mono text-sm border whitespace-pre-wrap ${isPassed
                        ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/5 text-rose-400 border-rose-500/20"
                        }`}
                >
                    {userOutput !== null && userOutput !== undefined ? (
                        formatText(userOutput)
                    ) : (
                        <span className="italic text-(--text-tertiary) text-xs">
                            No output
                        </span>
                    )}
                </div>
            </div>

            {/* Expected Output */}
            <div className="space-y-1.5">
                <p className="text-[11px] text-(--text-tertiary) font-bold uppercase tracking-wider">
                    Expected Output
                </p>
                <div className="px-3 py-2.5 rounded-md bg-(--bg-primary) font-mono text-sm text-(--text-primary) border border-(--border-primary) whitespace-pre-wrap">
                    {formatText(expectedOutput)}
                </div>
            </div>



            {/* Verdict Badge */}
            {/* <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${isPassed
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
            >
                {isPassed ? (
                    <CheckCircle2 className="w-3 h-3" />
                ) : (
                    <XCircle className="w-3 h-3" />
                )}
                {isPassed ? "Passed" : "Failed"}
            </div> */}
        </div>
    );
}
