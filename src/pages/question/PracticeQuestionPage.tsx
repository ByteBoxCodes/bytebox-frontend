import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { practiceData } from "../../data/practice-data/PracticeData";

const languageOptions = [
    { label: "JavaScript", value: "javascript", snippet: "// Write your JavaScript solution here\n" },
    { label: "Python", value: "python", snippet: "# Write your Python solution here\n" },
    { label: "C++", value: "cpp", snippet: "// Write your C++ solution here\n" },
    { label: "Java", value: "java", snippet: "// Write your Java solution here\n" },
];

const WORKSPACE_MIN_HEIGHT = "calc(100vh - 4.5rem)";

export default function PracticeQuestionPage() {
    const { questionId } = useParams<{ questionId: string }>();
    const numericQuestionId = Number(questionId);
    const [language, setLanguage] = useState(languageOptions[0].value);
    const [code, setCode] = useState(languageOptions[0].snippet);
    const [customInput, setCustomInput] = useState("");
    const [customOutput, setCustomOutput] = useState("Run a test case to see the output here.");

    const questionEntry = practiceData
        .flatMap((topic) => topic.questions.map((question) => ({ topic, question })))
        .find((entry) => entry.question.id === numericQuestionId);

    const selectedLanguage = languageOptions.find((item) => item.value === language);

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        const option = languageOptions.find((item) => item.value === selected);
        setLanguage(selected);
        setCode(option ? option.snippet : "");
        setCustomOutput("Run a test case to see the output here.");
    };

    const handleRunTests = () => {
        if (language !== "javascript") {
            setCustomOutput(
                `Inline execution for ${selectedLanguage?.label ?? language} is coming soon. Switch to JavaScript to run tests inside the browser.`
            );
            return;
        }

        const logs: string[] = [];
        const consoleProxy = {
            log: (...args: unknown[]) => logs.push(args.map((item) => String(item)).join(" ")),
            error: (...args: unknown[]) => logs.push(`Error: ${args.map((item) => String(item)).join(" ")}`),
        };

        try {
            // eslint-disable-next-line no-new-func
            const runnable = new Function("input", "console", code);
            const result = runnable(customInput, consoleProxy);
            if (typeof result !== "undefined") {
                logs.push(String(result));
            }
            setCustomOutput(logs.join("\n") || "Execution finished without output.");
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            setCustomOutput(`Runtime Error: ${message}`);
        }
    };

    if (!questionId || Number.isNaN(numericQuestionId) || !questionEntry) {
        return (
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4">
                <div className="mx-auto max-w-7xl">
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
        <div
            className="relative bg-gray-50 dark:bg-gray-900 transition-colors duration-200 overflow-hidden"
            style={{ height: WORKSPACE_MIN_HEIGHT }}
        >
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800/20 pointer-events-none"></div>

            <div
                className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-12 flex flex-col"
                style={{ height: WORKSPACE_MIN_HEIGHT }}
            >
                <Link
                    to="/practice"
                    className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-white hover:underline"
                >
                    ← Back to Practice Dashboard
                </Link>

                <div
                    className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1 min-h-0"
                >
                    {/* Question Details */}
                    <section className="lg:col-span-5 h-full overflow-hidden">
                        <div className="flex flex-col gap-6 h-full overflow-y-auto pr-1 lg:pr-3 pb-4">
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8 space-y-6">
                                <div>
                                    <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">{topicTitle}</p>
                                    <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white font-pj">{question.title}</h1>
                                </div>

                                <div className="flex flex-wrap gap-3 text-sm">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                                        Difficulty: {question.difficulty}
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                                        {question.points} pts
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                                        Status: {question.isCompleted ? "Completed" : "Pending"}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8 space-y-8">
                                <section>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Problem Description</h2>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Use the information above to solve the challenge. Detailed prompts for each question can be added here in the future.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Notes</h2>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                        <li>Write your solution in the language of your choice.</li>
                                        <li>Focus on clean logic and consider edge cases.</li>
                                        <li>Mark the question as complete once you are satisfied with your answer.</li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </section>

                    {/* Code Editor & Tests */}
                    <section className="lg:col-span-7 h-full overflow-hidden">
                        <div className="flex flex-col gap-6 h-full overflow-y-auto pl-0 lg:pl-3 pb-4">
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden min-h-[55vh]">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center gap-4 justify-between">
                                    <div>
                                        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Code Editor</p>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Solution Workspace</h2>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="text-sm text-gray-500 dark:text-gray-400" htmlFor="language-select">
                                            Language
                                        </label>
                                        <select
                                            id="language-select"
                                            value={language}
                                            onChange={handleLanguageChange}
                                            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg px-3 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        >
                                            {languageOptions.map(({ label, value }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="p-0.5 overflow-y-auto">
                                    <Editor
                                        theme="vs-dark"
                                        height="45vh"
                                        defaultLanguage="javascript"
                                        language={language}
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
                            </div>

                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Custom Test Cases</h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Input & Output</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Provide your own input to validate the logic before submitting.
                                    </p>
                                </div>

                                <textarea
                                    value={customInput}
                                    onChange={(event) => setCustomInput(event.target.value)}
                                    placeholder="Enter your custom input..."
                                    rows={4}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
                                />

                                <button
                                    type="button"
                                    onClick={handleRunTests}
                                    className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-gray-900 text-white py-3 text-sm font-semibold hover:bg-gray-800 transition"
                                >
                                    Run Custom Tests
                                </button>

                                <div className="bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Output</p>
                                    <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono leading-relaxed">
                                        {customOutput}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
