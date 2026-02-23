
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import QuestionPanel from "@/features/submission/QuestionPanel";
import SubmissionPanel from "@/features/submission/SubmissionPanel";
import type { Language } from "@/types/submission";
import { useGetProblemById } from "@/hooks/useGetProblemById";
import { Loader2 } from "lucide-react";
import { useSubmitSolutions } from "@/hooks/useSubmitSolutions";

export default function SubmissionPage() {
    const { questionId } = useParams<{ questionId: string }>();
    const { data, isLoading, isError } = useGetProblemById(questionId!);
    const [isRunning, setIsRunning] = useState(false);
    const { mutate, isPending } = useSubmitSolutions();

    if (isLoading) {
        return (
            <div className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center
                            bg-(--bg-primary) dark:bg-transparent overflow-hidden">
                {/* Dark overlay */}
                <div className="absolute inset-0 hidden dark:block pointer-events-none"
                    style={{ background: `linear-gradient(to bottom right, var(--dk-bg-from), var(--dk-bg-via), var(--dk-bg-to))` }} />
                <Loader2 className="relative z-10 h-8 w-8 animate-spin text-(--text-primary) dark:text-(--dk-text-muted)" />
            </div>
        );
    }

    if (isError || !questionId) {
        return (
            <div className="relative min-h-screen py-12 px-4 flex items-center justify-center
                            bg-(--bg-primary) dark:bg-transparent overflow-hidden">
                {/* Dark overlay */}
                <div className="absolute inset-0 hidden dark:block pointer-events-none"
                    style={{ background: `linear-gradient(to bottom right, var(--dk-bg-from), var(--dk-bg-via), var(--dk-bg-to))` }} />
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
        const currentUserId = "8ddf831d-e270-4bab-863c-926f6af9917f";
        const submissionData = {
            userId: currentUserId,
            problemId: questionId,
            language,
            code,
        };
        mutate(submissionData);
        console.log(`Submitting ${language} solution...`);
        console.log(code);
    };

    return (
        <div className="relative h-full w-full flex flex-col overflow-hidden
                        bg-(--bg-primary) dark:bg-transparent transition-colors duration-200">

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
                direction="horizontal"
                className="relative z-10 flex-1 w-full border-t border-(--border-primary) dark:border-(--dk-border)"
            >
                {/* Left Panel: Question Details */}
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full bg-(--bg-primary) dark:bg-(--dk-surface) transition-colors duration-200">
                        {data && <QuestionPanel question={data} />}
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle
                    className="dark:bg-(--dk-border) dark:hover:bg-(--dk-border-light) transition-colors" />

                {/* Right Panel: Code Editor */}
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full bg-(--bg-secondary) dark:bg-(--dk-surface) transition-colors duration-200">
                        <SubmissionPanel
                            onRunTest={handleRunTest}
                            onSubmit={handleSubmit}
                            isRunning={isRunning}
                            isSubmitting={isPending}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
