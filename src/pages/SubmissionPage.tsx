
import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import QuestionPanel from "@/features/submission/QuestionPanel";
import SubmissionPanel from "@/features/submission/SubmissionPanel";
import type { Question, Language } from "@/types/submission";
import { useGetProblemById } from "@/hooks/useGetProblemById";
import { Loader2 } from "lucide-react";

export default function SubmissionPage() {
    const { questionId } = useParams<{ questionId: string }>();

    const { data: problem, isLoading, isError } = useGetProblemById(questionId!);

    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentQuestion: Question | null = useMemo(() => {
        if (!problem) return null;

        const difficultyMap: Record<string, "Easy" | "Medium" | "Hard"> = {
            "EASY": "Easy",
            "MEDIUM": "Medium",
            "HARD": "Hard"
        };

        const pointsMap: Record<string, number> = {
            "EASY": 10,
            "MEDIUM": 20,
            "HARD": 30
        };

        // Helper to ensure difficulty is valid, defaulting to "Medium" if unknown
        const normalizeDifficulty = (diff: string): "Easy" | "Medium" | "Hard" => {
            return difficultyMap[diff as keyof typeof difficultyMap] || "Medium";
        };

        return {
            id: Number(problem.id) || 0, // Fallback if ID is not numeric
            title: problem.title,
            difficulty: normalizeDifficulty(problem.difficulty),
            points: pointsMap[problem.difficulty as keyof typeof pointsMap] || 10,
            isCompleted: false, // Default as we don't have user progress data yet
            description: problem.description,
            testCases: [], // Default empty
            inputFormat: ["To be added"], // Default
            outputFormat: ["To be added"], // Default
            constraints: ["To be added"], // Default
        };
    }, [problem]);

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-4rem)] w-full bg-(--bg-primary) flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !questionId || !currentQuestion) {
        return (
            <div className="bg-(--bg-primary) min-h-screen py-12 px-4 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-lg font-semibold text-(--text-primary)">
                        {isError ? "Error loading problem" : "Question not found"}
                    </p>
                    <Link
                        to="/problems"
                        className="inline-flex items-center text-sm font-medium text-(--text-primary) hover:underline"
                    >
                        Back to Problems
                    </Link>
                </div>
            </div>
        );
    }

    const handleRunTest = async (language: Language, code: string) => {
        setIsRunning(true);
        // Simulate API call
        console.log(`Running tests for ${language} execution...`);
        console.log(code);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsRunning(false);
        // You would handle output/results here
    };

    const handleSubmit = async (language: Language, code: string) => {
        setIsSubmitting(true);
        // Simulate API call
        console.log(`Submitting ${language} solution...`);
        console.log(code);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        // You would handle submission result here
    };

    return (
        <div className="h-full w-full bg-(--bg-primary) flex flex-col overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="flex-1 w-full border-t border-(--border-primary)">
                {/* Left Panel: Question Details */}
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full bg-(--bg-primary)">
                        <QuestionPanel question={currentQuestion} />
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Right Panel: Code Editor */}
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full bg-(--bg-secondary)">
                        <SubmissionPanel
                            onRunTest={handleRunTest}
                            onSubmit={handleSubmit}
                            isRunning={isRunning}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
