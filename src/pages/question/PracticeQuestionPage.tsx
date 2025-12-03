import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { practiceData } from "../../data/practice-data/PracticeData";

export default function PracticeQuestionPage() {
    const { questionId } = useParams<{ questionId: string }>();
    const numericQuestionId = Number(questionId);
    const [code, setCode] = useState(`// Start coding your solution here\n`);

    const questionEntry = practiceData
        .flatMap((topic) => topic.questions.map((question) => ({ topic, question })))
        .find((entry) => entry.question.id === numericQuestionId);

    if (!questionId || Number.isNaN(numericQuestionId) || !questionEntry) {
        return (
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4">
                <div className="mx-auto max-w-3xl">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Question not found
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            The question you are looking for doesn't exist or was removed.
                        </p>
                        <Link
                            to="/practice"
                            className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-white hover:underline"
                        >
                            Back to Practice Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const {
        topic: { title: topicTitle },
        question,
    } = questionEntry;

    return (
        <div className="bg-gray-950 min-h-screen">
            <div className="flex flex-col lg:flex-row h-screen">
                {/* Question Details */}
                <section className="w-full lg:w-1/2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto">
                    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
                        <Link
                            to="/practice"
                            className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-white hover:underline"
                        >
                            Back to Practice Dashboard
                        </Link>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-600 px-8 py-10">
                                <p className="text-sm uppercase tracking-wide text-gray-300">{topicTitle}</p>
                                <h1 className="mt-2 text-3xl font-bold text-white font-pj">{question.title}</h1>
                                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white">
                                        Difficulty: {question.difficulty}
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white">
                                        {question.points} pts
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white">
                                        Status: {question.isCompleted ? "Completed" : "Pending"}
                                    </span>
                                </div>
                            </div>

                            <div className="px-8 py-10 space-y-6 text-gray-700 dark:text-gray-200">
                                <section>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Problem Description
                                    </h2>
                                    <p>
                                        Use the information above to solve the challenge. Detailed prompts for each
                                        question can be added here in the future.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Notes
                                    </h2>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>Write your solution in the language of your choice.</li>
                                        <li>Focus on clean logic and consider edge cases.</li>
                                        <li>Mark the question as complete once you are satisfied with your answer.</li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Code Editor */}
                <section className="w-full lg:w-1/2 bg-[#0f111a] text-white border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col h-full">
                    <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-wide text-gray-400">Code Editor</p>
                            <h2 className="text-xl font-semibold">Solution Workspace</h2>
                        </div>
                        <span className="text-sm text-gray-400">Language: JavaScript</span>
                    </div>
                    <div className="flex-1 min-h-0">
                        <Editor
                            theme="vs-dark"
                            height="100%"
                            defaultLanguage="javascript"
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                            value={code}
                            onChange={(value) => setCode(value ?? "")}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
