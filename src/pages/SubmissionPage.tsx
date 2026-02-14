
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import QuestionPanel from "@/features/submission/QuestionPanel";
import SubmissionPanel from "@/features/submission/SubmissionPanel";
import { practiceData } from "../constants/practice-data/PracticeData";
import type { Question, Language } from "@/types/submission";

export default function SubmissionPage() {
    const { questionId } = useParams<{ questionId: string }>();
    const numericQuestionId = Number(questionId);

    // Find the question from practiceData
    // Note: In a real app, you might fetch this from an API
    // We map the existing data structure to our new Question type
    const questionEntry = practiceData
        .flatMap((topic) => topic.questions.map((question) => ({ topic, question })))
        .find((entry) => entry.question.id === numericQuestionId);

    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!questionId || Number.isNaN(numericQuestionId) || !questionEntry) {
        return (
            <div className="bg-(--bg-primary) min-h-screen py-12 px-4 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-lg font-semibold text-(--text-primary)">
                        Question not found
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

    const { question } = questionEntry;

    // Map legacy question data to new Question interface if needed
    // Assuming practiceData structure is compatible or we use it as partial
    const currentQuestion: Question = {
        id: question.id,
        title: question.title,
        difficulty: question.difficulty as "Easy" | "Medium" | "Hard",
        points: question.points,
        isCompleted: question.isCompleted,
        description: "Description placeholder", // legacy data might not have full description
        testCases: [], // legacy data might not have test cases
        // ... fill other fields with defaults or actual data
    };


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
            {/* Main Content Area - Full height minus header (if header is outside this component) */}
            {/* The Header is likely in a layout wrapper, so this component takes remaining space */}
            {/* However, the previous implementation had a specific height calculation.
                 We will use h-[calc(100vh-theme('spacing.16'))] assuming standard header height ~4rem (16)
                 or easier: just h-full if the parent container handles layout effectively.
                 Let's assume h-[calc(100vh-4rem)] to account for the header.
             */}

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
