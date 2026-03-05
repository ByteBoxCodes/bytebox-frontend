import { useState } from "react";
import {
    AlertTriangle,
    CheckCircle2,
    Loader2,
    TerminalSquare,
    XCircle,
} from "lucide-react";
import TestCaseDetail from "./TestCaseDetail";

interface TestResultTabProps {
    isSubmitting: boolean;
    isRunning: boolean;
    submissionResult?: any;
    submissionError?: any;
}

export default function TestResultTab({
    isSubmitting,
    isRunning,
    submissionResult,
    submissionError,
}: TestResultTabProps) {
    const [activeResultCase, setActiveResultCase] = useState<number>(0);

    /* ── Loading ── */
    if (isSubmitting || isRunning) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-(--text-tertiary) space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                <span className="text-sm font-medium animate-pulse text-(--text-secondary)">
                    {isSubmitting
                        ? "Testing all test cases..."
                        : "Running test cases..."}
                </span>
            </div>
        );
    }

    /* ── Result ── */
    if (submissionResult) {
        return (
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* ── ACCEPTED ── */}
                {(submissionResult?.status === "ACCEPTED" ||
                    (submissionResult?.passedTestCases !== undefined &&
                        Number(submissionResult?.passedTestCases) ===
                        Number(submissionResult?.totalTestCases))) && (
                        <AcceptedResult
                            submissionResult={submissionResult}
                            activeResultCase={activeResultCase}
                            onSelectCase={setActiveResultCase}
                        />
                    )}

                {/* ── WRONG ANSWER ── */}
                {submissionResult?.status === "WRONG_ANSWER" &&
                    (!submissionResult?.errorType ||
                        submissionResult?.errorType === "WRONG_ANSWER") && (
                        <WrongAnswerResult
                            submissionResult={submissionResult}
                            activeResultCase={activeResultCase}
                            onSelectCase={setActiveResultCase}
                        />
                    )}

                {/* ── OTHER ERRORS ── */}
                {submissionResult?.status !== "ACCEPTED" &&
                    !(
                        submissionResult?.passedTestCases !== undefined &&
                        Number(submissionResult?.passedTestCases) ===
                        Number(submissionResult?.totalTestCases)
                    ) &&
                    ((submissionResult?.errorType &&
                        submissionResult?.errorType !== "WRONG_ANSWER") ||
                        submissionResult?.status !== "WRONG_ANSWER") && (
                        <ErrorResult submissionResult={submissionResult} />
                    )}
            </div>
        );
    }

    /* ── Submission Error ── */
    if (submissionError) {
        return (
            <div className="flex flex-col h-full space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="text-rose-500 font-bold text-lg">
                        Submission Error
                    </span>
                </div>
                <div className="p-4 rounded-md border border-rose-500/20 bg-rose-500/10 flex-1 min-h-0 overflow-auto">
                    <pre className="text-sm font-mono text-rose-500 whitespace-pre-wrap">
                        {submissionError?.response?.data?.message ||
                            submissionError?.message ||
                            JSON.stringify(submissionError, null, 2)}
                    </pre>
                </div>
            </div>
        );
    }

    /* ── Empty State ── */
    return (
        <div className="flex flex-col items-center justify-center h-full text-(--text-tertiary) space-y-3">
            <div className="p-3 bg-(--bg-primary) rounded-full border border-(--border-primary)">
                <TerminalSquare className="w-6 h-6 opacity-60" />
            </div>
            <span className="text-sm font-medium">
                Run code or submit to see test results.
            </span>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Internal sub-components
   ───────────────────────────────────────────── */

interface ResultSectionProps {
    submissionResult: any;
    activeResultCase: number;
    onSelectCase: (i: number) => void;
}

/* ── Test Case Tabs (shared between Accepted & Wrong Answer) ── */
function TestCaseTabs({
    testCases,
    activeResultCase,
    onSelectCase,
}: {
    testCases: any[];
    activeResultCase: number;
    onSelectCase: (i: number) => void;
}) {
    return (
        <div className="flex gap-1.5 flex-wrap">
            {testCases.map((tc: any, i: number) => {
                const isPassed = tc.status === "PASSED";
                const isActive = activeResultCase === i;
                return (
                    <button
                        key={i}
                        onClick={() => onSelectCase(i)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${isActive
                                ? isPassed
                                    ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
                                    : "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30"
                                : "hover:bg-(--bg-tertiary)/50 text-(--text-secondary) hover:text-(--text-primary)"
                            }`}
                    >
                        {isPassed ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        ) : (
                            <XCircle className="w-3 h-3 text-rose-400 shrink-0" />
                        )}
                        Case {i + 1}
                    </button>
                );
            })}
        </div>
    );
}

/* ── Fallback Progress Bar List ── */
function FallbackBarList({
    totalTestCases,
    passedTestCases,
}: {
    totalTestCases: number;
    passedTestCases: number;
}) {
    return (
        <div className="space-y-1.5">
            {Array.from({ length: totalTestCases }).map((_: any, i: number) => {
                const passed = i < passedTestCases;
                return (
                    <div
                        key={i}
                        className="flex items-center gap-2 animate-in fade-in slide-in-from-left-1"
                        style={{
                            animationDelay: `${150 + i * 100}ms`,
                            animationFillMode: "both",
                            animationDuration: "350ms",
                        }}
                    >
                        {passed ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        ) : (
                            <XCircle className="w-3 h-3 text-rose-400 shrink-0" />
                        )}
                        <span className="text-[11px] text-(--text-secondary) font-medium w-14 shrink-0">
                            Test {i + 1}
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-(--bg-primary) overflow-hidden">
                            <div
                                className={`h-full rounded-full ${passed
                                        ? "bg-emerald-500/60"
                                        : "bg-rose-500/60"
                                    } animate-in slide-in-from-left`}
                                style={{
                                    width: "100%",
                                    animationDelay: `${250 + i * 100}ms`,
                                    animationFillMode: "both",
                                    animationDuration: "500ms",
                                }}
                            />
                        </div>
                        <span
                            className={`text-[10px] font-medium shrink-0 ${passed
                                    ? "text-emerald-400/70"
                                    : "text-rose-400/70"
                                }`}
                        >
                            {passed ? "Passed" : "Failed"}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

/* ── ACCEPTED Result ── */
function AcceptedResult({
    submissionResult,
    activeResultCase,
    onSelectCase,
}: ResultSectionProps) {
    return (
        <div className="space-y-4">
            {/* Status Header */}
            <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-in zoom-in duration-300" />
                <span className="text-emerald-400 font-bold text-xs">
                    Accepted
                </span>
                <span className="text-(--text-tertiary) text-[11px]">·</span>
                <span className="text-[11px] text-(--text-tertiary)">
                    All test cases passed
                </span>
            </div>

            {/* Test Cases */}
            {submissionResult?.testCases &&
                submissionResult.testCases.length > 0 ? (
                <>
                    <TestCaseTabs
                        testCases={submissionResult.testCases}
                        activeResultCase={activeResultCase}
                        onSelectCase={onSelectCase}
                    />
                    {submissionResult.testCases[activeResultCase] && (
                        <TestCaseDetail
                            input={
                                submissionResult.testCases[activeResultCase]
                                    .input
                            }
                            expectedOutput={
                                submissionResult.testCases[activeResultCase]
                                    .expectedOutput
                            }
                            userOutput={
                                submissionResult.testCases[activeResultCase]
                                    .userOutput
                            }
                            isPassed={true}
                        />
                    )}
                </>
            ) : (
                submissionResult?.totalTestCases > 0 && (
                    <FallbackBarList
                        totalTestCases={Number(submissionResult.totalTestCases)}
                        passedTestCases={Number(
                            submissionResult.passedTestCases
                        )}
                    />
                )
            )}

            {/* Success Banner */}
            <div
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border-l-2 border-emerald-500 bg-emerald-500/5 animate-in fade-in slide-in-from-bottom-1"
                style={{
                    animationDelay: `${350 +
                        (Number(submissionResult?.totalTestCases) || 0) * 100
                        }ms`,
                    animationFillMode: "both",
                    animationDuration: "400ms",
                }}
            >
                <span className="text-base">🎉</span>
                <div>
                    <p className="text-[12px] text-emerald-400 font-semibold leading-tight">
                        Well done!
                    </p>
                    <p className="text-[11px] text-(--text-tertiary) leading-snug">
                        Your solution beats the challenge. Keep solving!
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ── WRONG ANSWER Result ── */
function WrongAnswerResult({
    submissionResult,
    activeResultCase,
    onSelectCase,
}: ResultSectionProps) {
    return (
        <div className="space-y-4">
            {/* Status Header */}
            <div className="flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span className="text-rose-400 font-bold text-xs">
                    Wrong Answer
                </span>
                {submissionResult?.passedTestCases !== undefined &&
                    submissionResult?.totalTestCases !== undefined && (
                        <>
                            <span className="text-(--text-tertiary) text-[11px]">
                                ·
                            </span>
                            <span className="text-[11px] text-(--text-tertiary)">
                                {submissionResult.passedTestCases}/
                                {submissionResult.totalTestCases} test cases
                                passed
                            </span>
                        </>
                    )}
            </div>

            {/* Test Cases */}
            {submissionResult?.testCases &&
                submissionResult.testCases.length > 0 ? (
                <>
                    <TestCaseTabs
                        testCases={submissionResult.testCases}
                        activeResultCase={activeResultCase}
                        onSelectCase={onSelectCase}
                    />
                    {submissionResult.testCases[activeResultCase] && (
                        <TestCaseDetail
                            input={
                                submissionResult.testCases[activeResultCase]
                                    .input
                            }
                            expectedOutput={
                                submissionResult.testCases[activeResultCase]
                                    .expectedOutput
                            }
                            userOutput={
                                submissionResult.testCases[activeResultCase]
                                    .userOutput
                            }
                            isPassed={
                                submissionResult.testCases[activeResultCase]
                                    .status === "PASSED"
                            }
                        />
                    )}
                </>
            ) : (
                submissionResult?.passedTestCases !== undefined &&
                submissionResult?.totalTestCases !== undefined &&
                Number(submissionResult.totalTestCases) > 0 && (
                    <FallbackBarList
                        totalTestCases={Number(submissionResult.totalTestCases)}
                        passedTestCases={Number(
                            submissionResult.passedTestCases
                        )}
                    />
                )
            )}

            {/* Hint Banner */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border-l-2 border-amber-500 bg-amber-500/5">
                <span className="text-base">💡</span>
                <p className="text-[11px] text-(--text-tertiary) leading-snug">
                    Review your logic and edge cases. Check the sample inputs
                    for hints.
                </p>
            </div>
        </div>
    );
}

/* ── Error Result (Compile / Runtime / TLE) ── */
function ErrorResult({ submissionResult }: { submissionResult: any }) {
    return (
        <div className="space-y-4">
            {/* Status Header */}
            <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span className="text-rose-400 font-bold text-xs">
                    {(
                        submissionResult?.errorType ||
                        submissionResult?.status ||
                        "Error"
                    )
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                </span>
                <span className="text-(--text-tertiary) text-[11px]">·</span>
                <span className="text-[11px] text-(--text-tertiary)">
                    Your code could not be executed
                </span>
            </div>

            {/* Error Message */}
            {submissionResult?.errorMessage && (
                <div className="p-4 rounded-xl bg-(--bg-primary) border border-(--border-primary) flex-1 min-h-0 overflow-auto">
                    <pre className="text-[13px] font-mono text-rose-400 whitespace-pre-wrap leading-relaxed">
                        {submissionResult.errorMessage}
                    </pre>
                </div>
            )}
        </div>
    );
}
