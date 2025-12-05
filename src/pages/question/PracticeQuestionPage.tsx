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

const PYODIDE_VERSION = "0.24.1";
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const PYODIDE_SCRIPT_URL = `${PYODIDE_BASE_URL}pyodide.js`;
const PYODIDE_SCRIPT_ID = "pyodide-runtime-script";
const PYODIDE_CODE_VARIABLE = "__pyodide_user_code__";
const PYODIDE_INPUT_VARIABLE = "__pyodide_custom_input__";

type PyodideInstance = {
    runPythonAsync: (code: string) => Promise<any>;
    globals: {
        set: (name: string, value: unknown) => void;
        delete?: (name: string) => void;
    };
};

declare global {
    interface Window {
        // Provided by the Pyodide runtime once the script loads in the browser
        loadPyodide?: (options: { indexURL: string }) => Promise<PyodideInstance>;
    }
}

let pyodideScriptPromise: Promise<void> | null = null;
let pyodideInstancePromise: Promise<PyodideInstance> | null = null;

const ensurePyodideScript = () => {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return Promise.reject(new Error("Pyodide is only available in the browser."));
    }

    if (window.loadPyodide) {
        return Promise.resolve();
    }

    if (!pyodideScriptPromise) {
        pyodideScriptPromise = new Promise((resolve, reject) => {
            const existingScript = document.getElementById(PYODIDE_SCRIPT_ID) as HTMLScriptElement | null;

            if (existingScript) {
                existingScript.addEventListener("load", () => resolve(), { once: true });
                existingScript.addEventListener(
                    "error",
                    () => reject(new Error("Failed to load the Pyodide runtime.")),
                    { once: true }
                );
                return;
            }

            const script = document.createElement("script");
            script.id = PYODIDE_SCRIPT_ID;
            script.src = PYODIDE_SCRIPT_URL;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load the Pyodide runtime."));
            document.head.appendChild(script);
        });
    }

    return pyodideScriptPromise;
};

const getPyodideInstance = async () => {
    if (!pyodideInstancePromise) {
        pyodideInstancePromise = (async () => {
            await ensurePyodideScript();
            if (!window.loadPyodide) {
                throw new Error("Pyodide failed to initialize.");
            }
            return window.loadPyodide({ indexURL: PYODIDE_BASE_URL });
        })();
    }

    return pyodideInstancePromise;
};

const PYTHON_EXECUTION_WRAPPER = `
import sys
from io import StringIO
from contextlib import redirect_stdout, redirect_stderr
from pyodide.ffi import to_js
import traceback

stdin_backup = sys.stdin
sys.stdin = StringIO(${PYODIDE_INPUT_VARIABLE})

stdout_buffer = StringIO()
stderr_buffer = StringIO()
error_message = None

try:
    with redirect_stdout(stdout_buffer), redirect_stderr(stderr_buffer):
        exec(${PYODIDE_CODE_VARIABLE}, {})
except Exception:
    error_message = traceback.format_exc()
finally:
    sys.stdin = stdin_backup

to_js((stdout_buffer.getvalue(), stderr_buffer.getvalue(), error_message))
`;

const runPythonWithPyodide = async (sourceCode: string, stdinValue: string) => {
    const pyodide = await getPyodideInstance();
    pyodide.globals.set(PYODIDE_CODE_VARIABLE, sourceCode);
    pyodide.globals.set(PYODIDE_INPUT_VARIABLE, stdinValue ?? "");

    const result = await pyodide.runPythonAsync(PYTHON_EXECUTION_WRAPPER);

    if (typeof pyodide.globals.delete === "function") {
        pyodide.globals.delete(PYODIDE_CODE_VARIABLE);
        pyodide.globals.delete(PYODIDE_INPUT_VARIABLE);
    }

    if (!Array.isArray(result)) {
        const fallback = String(result ?? "").trim();
        return fallback || "Execution finished without output.";
    }

    const [stdout = "", stderr = "", traceback = ""] = result as [string, string, string | null];
    const combined = [stdout, stderr, traceback]
        .filter((segment) => Boolean(segment && segment.trim().length))
        .join("\n")
        .trim();

    return combined || "Execution finished without output.";
};

export default function PracticeQuestionPage() {
    const { questionId } = useParams<{ questionId: string }>();
    const numericQuestionId = Number(questionId);
    const [language, setLanguage] = useState(languageOptions[0].value);
    const [code, setCode] = useState(languageOptions[0].snippet);
    const [customInput, setCustomInput] = useState("");
    const [customOutput, setCustomOutput] = useState("Run a test case to see the output here.");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<string | null>(null);
    const [didPassSubmission, setDidPassSubmission] = useState<boolean | null>(null);

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

    const runCodeForLanguage = async (activeLanguage: string, source: string, inputValue: string) => {
        if (activeLanguage === "javascript") {
            const logs: string[] = [];
            const consoleProxy = {
                log: (...args: unknown[]) => logs.push(args.map((item) => String(item)).join(" ")),
                error: (...args: unknown[]) => logs.push(`Error: ${args.map((item) => String(item)).join(" ")}`),
            };

            // eslint-disable-next-line no-new-func
            const runnable = new Function("input", "console", source);
            const result = runnable(inputValue, consoleProxy);
            if (typeof result !== "undefined") {
                logs.push(String(result));
            }
            return logs.join("\n").trim() || "Execution finished without output.";
        }

        if (activeLanguage === "python") {
            return (await runPythonWithPyodide(source, inputValue)).trim();
        }

        throw new Error(
            `Inline execution for ${selectedLanguage?.label ?? activeLanguage} is coming soon. Switch to JavaScript or Python to run tests inside the browser.`
        );
    };

    const handleRunTests = async () => {
        if (isRunning) {
            return;
        }

        setIsRunning(true);
        const activeLanguage = language;

        try {
            setCustomOutput(activeLanguage === "python" && !pyodideInstancePromise ? "Loading Python runtime..." : "Running code...");
            const output = await runCodeForLanguage(activeLanguage, code, customInput);
            setCustomOutput(output);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            const prefix = activeLanguage === "python" ? "Python Runtime Error" : "Runtime Error";
            setCustomOutput(`${prefix}: ${message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmitSolution = async () => {
        if (isSubmitting) {
            return;
        }

        if (!question.testCases || question.testCases.length === 0) {
            setSubmissionResult("No official test cases are available for this problem yet.");
            setDidPassSubmission(null);
            return;
        }

        setIsSubmitting(true);
        setSubmissionResult("Running official test cases...");
        setDidPassSubmission(null);

        try {
            for (let index = 0; index < question.testCases.length; index += 1) {
                const testCase = question.testCases[index];
                const output = await runCodeForLanguage(language, code, testCase.input);
                const normalizedOutput = output.trim();
                const normalizedExpected = testCase.expectedOutput.trim();
                const comparisonMode = testCase.comparison ?? "exact";

                const didMatch =
                    comparisonMode === "contains"
                        ? normalizedOutput.includes(normalizedExpected)
                        : normalizedOutput === normalizedExpected;

                if (!didMatch) {
                    const reason =
                        comparisonMode === "contains"
                            ? `Expected output to contain "${normalizedExpected}"`
                            : `Expected "${normalizedExpected}" but received "${normalizedOutput || "<empty>"}"`;

                    setSubmissionResult(`Test case ${index + 1} failed. ${reason}.`);
                    setDidPassSubmission(false);
                    return;
                }
            }

            setSubmissionResult(`All ${question.testCases.length} test cases passed!`);
            setDidPassSubmission(true);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            setSubmissionResult(`Submission failed: ${message}`);
            setDidPassSubmission(false);
        } finally {
            setIsSubmitting(false);
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
                className="relative px-4 mx-auto max-w-[1480px] sm:px-6 lg:px-8  flex flex-col"
                style={{ height: WORKSPACE_MIN_HEIGHT }}
            >


                <div
                    className="mt-8 grid grid-cols-1 lg:grid-cols-12 items-start flex-1 min-h-0"
                >
                    {/* Question Details */}
                    <section className="lg:col-span-5 h-full overflow-hidden">
                        <div className="flex flex-col gap-6 h-full overflow-y-auto pr-1 lg:pr-3 pb-4">
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8 space-y-6">
                                <div>
                                    <Link
                                        to="/practice"
                                        className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-white/70 hover:underline"
                                    >
                                        ← Back to Practice Dashboard
                                    </Link>
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
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Problem Details</h2>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Given an integer <code>n</code>, determine the result requested in the prompt. Make sure to handle edge cases such as negative values,
                                        zero, and very large inputs while maintaining optimal time and space complexity.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Input Format</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                        <li>Single line containing one integer <code>n</code>.</li>
                                        <li>Optional second line may contain additional parameters depending on the variation.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Output Format</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                        <li>Print a single line with the computed answer.</li>
                                        <li>Include explanatory text only if the problem explicitly asks for it.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Constraints</h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
                                        <li>1 ≤ n ≤ 10<sup>9</sup></li>
                                        <li>Time Limit: 1s</li>
                                        <li>Memory Limit: 256 MB</li>
                                        <li>All inputs are integers</li>
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Sample Input</h3>
                                        <pre className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-900 dark:text-gray-100 font-mono whitespace-pre-wrap">5</pre>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Sample Output</h3>
                                        <pre className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-900 dark:text-gray-100 font-mono whitespace-pre-wrap">120</pre>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Explanation: For input <code>5</code>, the desired computation results in <code>120</code>. Use this to verify the correctness of your approach before submitting.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Tips</h3>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                        <li>Write modular helper functions for repeated logic.</li>
                                        <li>Consider iterative and recursive solutions to compare trade-offs.</li>
                                        <li>Document assumptions inside comments for future reference.</li>
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
                                    disabled={isRunning}
                                    className={`inline-flex w-full justify-center items-center gap-2 rounded-xl bg-gray-900 text-white py-3 text-sm font-semibold transition ${isRunning ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800"
                                        }`}
                                >
                                    {isRunning ? "Running..." : "Run Custom Tests"}
                                </button>

                                <div className="bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Output</p>
                                    <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono leading-relaxed">
                                        {customOutput}
                                    </pre>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Official Evaluation</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Submit your code against curated test cases for this problem.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSubmitSolution}
                                        disabled={isSubmitting}
                                        className={`inline-flex w-full justify-center items-center gap-2 rounded-xl bg-indigo-600 text-white py-3 text-sm font-semibold transition ${isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-500"
                                            }`}
                                    >
                                        {isSubmitting ? "Evaluating..." : "Submit & Run Tests"}
                                    </button>

                                    {submissionResult && (
                                        <div
                                            className={`rounded-xl p-4 text-sm font-medium ${didPassSubmission === null
                                                ? "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-100"
                                                : didPassSubmission
                                                    ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100"
                                                    : "bg-rose-50 text-rose-800 dark:bg-rose-500/20 dark:text-rose-100"
                                                }`}
                                        >
                                            {submissionResult}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
