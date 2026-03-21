
import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import QuestionPanel from "@/features/submission/QuestionPanel";
import SubmissionPanel from "@/features/submission/SubmissionPanel";
import SuccessModal from "@/features/submission/SuccessModal";
import type { Language } from "@/types/submission";
import { useGetProblemById } from "@/hooks/useGetProblemById";
import { Layers } from "lucide-react";
import SubmissionPageSkeleton from "@/fallback/SubmissionPageSkeleton";
import { useSubmitSolutions } from "@/hooks/useSubmitSolutions";
import { useGetMySubmissions } from "@/hooks/useGetMySubmissions";
import { useRunSolution } from "@/hooks/useRunSolution";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SubmissionPage() {
    const { questionId } = useParams<{ questionId: string }>();
    const { data, isLoading, isError } = useGetProblemById(questionId!);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [lastAction, setLastAction] = useState<"run" | "submit" | null>(null);
    const isAuth = isAuthenticated();
    const isMobile = useMediaQuery("(max-width: 1023px)");

    const { mutate: runMutate, isPending: isRunPending, error: runError, data: runResult } = useRunSolution();
    const { mutate: submitMutate, isPending: isSubmitPending, error: submitError, data: submitResult } = useSubmitSolutions();
    const { data: submissions } = useGetMySubmissions(questionId!);

    const activeResult = lastAction === "run" ? runResult : submitResult;
    const activeError = lastAction === "run" ? runError : submitError;

    // Compute solved status from submissions
    const isSolved = useMemo(() => {
        if (!submissions?.length) return false;
        if (submitResult?.status === "ACCEPTED") return true;
        return submissions.some((s) => s.status === "ACCEPTED");
    }, [submissions, submitResult]);

    // Clear sessionStorage for previous problem when route changes (not on reload)
    const prevQuestionIdRef = useRef(questionId);
    useEffect(() => {
        const prevId = prevQuestionIdRef.current;
        if (prevId && prevId !== questionId) {
            try { sessionStorage.removeItem(`bytebox_solved_${prevId}`); } catch { /* ignore */ }
        }
        prevQuestionIdRef.current = questionId;
    }, [questionId]);

    // Auto-open success modal when all test cases pass
    useEffect(() => {
        if (
            lastAction === "submit" &&
            submitResult &&
            (submitResult.status === "ACCEPTED" ||
                (submitResult.passedTestCases !== undefined &&
                    Number(submitResult.passedTestCases) === Number(submitResult.totalTestCases)))
        ) {
            setShowSuccessModal(true);
        }
    }, [submitResult, lastAction]);

    if (isLoading) {
        return <SubmissionPageSkeleton />;
    }

    if (isError || !questionId) {
        return (
            <div className="relative min-h-screen py-12 px-4 flex items-center justify-center
                            bg-(--bg-secondary) overflow-hidden">

                <div className="relative z-10 text-center space-y-4">
                    <p className="text-lg font-semibold text-(--text-primary) dark:text-(--dk-text)">
                        {isError ? "Error loading problem" : "Question not found"}
                    </p>
                    <Link
                        to="/problems"
                        className="inline-flex items-center text-sm font-medium underline underline-offset-4
                                   text-(--text-primary) dark:text-(--dk-text-dim) hover:opacity-80 transition-opacity"
                    >
                        Back to Problems
                    </Link>
                </div>
            </div>
        );
    }

    const handleRunTest = async (language: Language, code: string) => {
        setLastAction("run");
        runMutate({
            problemId: questionId,
            language,
            code,
        });
    };

    const handleSubmit = async (language: Language, code: string) => {
        setLastAction("submit");
        submitMutate({
            problemId: questionId,
            language,
            code,
        });
    };

    return (
        <div className={`relative flex flex-col transition-colors duration-200
                        bg-(--bg-secondary) border-(--bg-secondary)
                        dark:border-(--bg-secondary)
                        ${isMobile ? 'min-h-screen' : 'h-full overflow-hidden'}`}>

            {/* Dark mode gradient overlay */}
            <div className="absolute inset-0 hidden dark:block pointer-events-none"
                style={{ background: `linear-gradient(to bottom right, var(--dk-bg-from), var(--dk-bg-via), var(--dk-bg-to))` }} />

            {/* Dark mode blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden hidden dark:block">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl"
                    style={{ background: "var(--dk-blob-a)" }} />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl"
                    style={{ background: "var(--dk-blob-b)" }} />
            </div>

            {isMobile ? (
                /* ── Mobile: scrollable stacked layout ── */
                <div className="relative z-10 flex-1 flex flex-col border-t border-(--border-primary) dark:border-(--dk-border)">
                    {/* Question Panel */}
                    <div className="bg-(--bg-primary) dark:bg-(--bg-secondary) transition-colors duration-200">
                        {data && <QuestionPanel question={data} isSolved={isSolved} />}
                    </div>

                    {/* Code Editor */}
                    <div className={`relative min-h-[60vh] flex flex-col bg-(--bg-secondary) transition-colors duration-200 ${!isAuth ? "blur-[3px] pointer-events-none select-none opacity-60" : ""}`}>
                        <SubmissionPanel
                            problemId={questionId}
                            question={data!}
                            onRunTest={handleRunTest}
                            onSubmit={handleSubmit}
                            isRunning={isRunPending}
                            isSubmitting={isSubmitPending}
                            submissionResult={activeResult}
                            submissionError={activeError}
                            submissions={submissions}
                        />
                    </div>

                    {!isAuth && (
                        <div className="sticky bottom-0 z-50 flex flex-col items-center justify-center bg-(--bg-secondary)/90 backdrop-blur-sm py-6 px-4 border-t border-(--border-primary)">
                            <div className="flex flex-col items-center text-center max-w-sm">
                                <div className="p-3 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-2xl mb-3">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold tracking-tight text-(--text-primary) dark:text-(--dk-text) mb-1">Login to Code</h3>
                                <p className="text-sm text-(--text-secondary) dark:text-(--dk-text-dim) mb-4 leading-relaxed">
                                    Join to write, run, and save your solutions.
                                </p>
                                <Link to="/login" className="px-6 py-2.5 text-sm bg-(--text-primary) text-(--bg-primary) dark:bg-(--dk-text) dark:text-(--bg-secondary) font-semibold rounded-full hover:opacity-90 transition-opacity active:scale-95 shadow-md">
                                    Sign In to Continue
                                </Link>
                            </div>
                        </div>
                    )}

                    <SuccessModal
                        isOpen={showSuccessModal}
                        onClose={() => setShowSuccessModal(false)}
                        passedTestCases={submitResult?.passedTestCases}
                        totalTestCases={submitResult?.totalTestCases}
                        problemTitle={data?.title}
                    />
                </div>
            ) : (
                /* ── Desktop: resizable horizontal panels ── */
                <ResizablePanelGroup
                    orientation="horizontal"
                    className="relative z-10 flex-1 w-full border-t border-(--border-primary) dark:border-(--dk-border)"
                >
                    <ResizablePanel defaultSize={50} minSize={30}>
                        <div className="h-full bg-(--bg-primary) dark:bg-(--bg-secondary) transition-colors duration-200">
                            {data && <QuestionPanel question={data} isSolved={isSolved} />}
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle
                        className="dark:bg-(--dk-border) dark:hover:bg-(--dk-border-light) transition-colors" />

                    <ResizablePanel defaultSize={50} minSize={30} className="relative">
                        <div className={`h-full bg-(--bg-secondary) transition-colors duration-200 ${!isAuth ? "blur-[3px] pointer-events-none select-none opacity-60" : ""}`}>
                            <SubmissionPanel
                                problemId={questionId}
                                question={data!}
                                onRunTest={handleRunTest}
                                onSubmit={handleSubmit}
                                isRunning={isRunPending}
                                isSubmitting={isSubmitPending}
                                submissionResult={activeResult}
                                submissionError={activeError}
                                submissions={submissions}
                            />
                        </div>

                        {!isAuth && (
                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-(--bg-secondary)/40 backdrop-blur-[1px]">
                                <div className="flex flex-col items-center text-center max-w-sm px-4">
                                    <div className="p-3 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-2xl mb-4">
                                        <Layers className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold tracking-tight text-(--text-primary) dark:text-(--dk-text) mb-2">Login to Code</h3>
                                    <p className="text-sm text-(--text-secondary) dark:text-(--dk-text-dim) mb-6 leading-relaxed">
                                        Join to write, run, and save your solutions. Track your progress with detailed submission history.
                                    </p>
                                    <Link to="/login" className="px-6 py-2.5 text-sm bg-(--text-primary) text-(--bg-primary) dark:bg-(--dk-text) dark:text-(--bg-secondary) font-semibold rounded-full hover:opacity-90 transition-opacity active:scale-95 shadow-md">
                                        Sign In to Continue
                                    </Link>
                                </div>
                            </div>
                        )}

                        <SuccessModal
                            isOpen={showSuccessModal}
                            onClose={() => setShowSuccessModal(false)}
                            passedTestCases={submitResult?.passedTestCases}
                            totalTestCases={submitResult?.totalTestCases}
                            problemTitle={data?.title}
                        />
                    </ResizablePanel>
                </ResizablePanelGroup>
            )}
        </div>
    );
}
