
import { useState, useEffect } from "react";
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
import { Loader2 } from "lucide-react";
import { useSubmitSolutions } from "@/hooks/useSubmitSolutions";

export default function SubmissionPage() {
    const { questionId } = useParams<{ questionId: string }>();
    const { data, isLoading, isError } = useGetProblemById(questionId!);
    const [isRunning, setIsRunning] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { mutate, isPending, error: submissionError, data: submissionResult } = useSubmitSolutions();

    // Auto-open success modal when all test cases pass
    useEffect(() => {
        if (
            submissionResult &&
            (submissionResult.status === "ACCEPTED" ||
                (submissionResult.passedTestCases !== undefined &&
                    Number(submissionResult.passedTestCases) === Number(submissionResult.totalTestCases)))
        ) {
            setShowSuccessModal(true);
        }
    }, [submissionResult]);

    if (isLoading) {
        return (
            <div className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center
                            bg-(--bg-secondary) overflow-hidden">

                <Loader2 className="relative z-10 h-8 w-8 animate-spin text-(--text-primary) dark:text-(--dk-text-muted)" />
            </div>
        );
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
        setIsRunning(true);
        console.log(`Running tests for ${language} execution...`);
        console.log(code);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsRunning(false);
    };

    const handleSubmit = async (language: Language, code: string) => {
        const submissionData = {
            problemId: questionId,
            language,
            code,
        };
        mutate(submissionData);
    };

    return (
        <div className="relative h-full flex flex-col overflow-hidden transition-colors duration-200
                        bg-(--bg-secondary) border-(--bg-secondary)
                        dark:border-(--bg-secondary)">

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

            <ResizablePanelGroup
                orientation="horizontal"
                className="relative z-10 flex-1 w-full border-t border-(--border-primary) dark:border-(--dk-border)"
            >
                {/* Left Panel: Question Details */}
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full bg-(--bg-primary) dark:bg-(--bg-secondary) transition-colors duration-200">
                        {data && <QuestionPanel question={data} />}
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle
                    className="dark:bg-(--dk-border) dark:hover:bg-(--dk-border-light) transition-colors" />

                {/* Right Panel: Code Editor */}
                <ResizablePanel defaultSize={50} minSize={30} className="">
                    <div className="h-full bg-(--bg-secondary) transition-colors duration-200">
                        <SubmissionPanel
                            question={data!}
                            onRunTest={handleRunTest}
                            onSubmit={handleSubmit}
                            isRunning={isRunning}
                            isSubmitting={isPending}
                            submissionResult={submissionResult}
                            submissionError={submissionError}
                        />
                    </div>

                    <SuccessModal
                        isOpen={showSuccessModal}
                        onClose={() => setShowSuccessModal(false)}
                        passedTestCases={submissionResult?.passedTestCases}
                        totalTestCases={submissionResult?.totalTestCases}
                        problemTitle={data?.title}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
