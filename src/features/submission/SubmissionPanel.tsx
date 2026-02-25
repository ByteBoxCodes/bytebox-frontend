
import { useState } from "react";
import Editor from "@monaco-editor/react";
import type { Language, LanguageOption } from "@/types/submission";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Send, TerminalSquare } from "lucide-react";

import type { IProblem } from "@/types/problems";

interface SubmissionPanelProps {
    question?: IProblem;
    defaultCode?: string;
    onRunTest: (language: Language, code: string) => Promise<void>;
    onSubmit: (language: Language, code: string) => Promise<void>;
    isRunning: boolean;
    isSubmitting: boolean;
    submissionResult?: any;
    submissionError?: any;
}

const languageOptions: LanguageOption[] = [
    { label: "C++", value: "cpp", snippet: "// Write your C++ solution here\n#include <iostream>\n\nusing namespace std;\n\nint main() {\n    // code here\n    return 0;\n}\n" },
    { label: "Java", value: "java", snippet: "// Write your Java solution here\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // code here\n    }\n}\n" },
];

export default function SubmissionPanel({
    question,
    onRunTest,
    onSubmit,
    isRunning,
    isSubmitting,
    submissionResult,
    submissionError,
}: SubmissionPanelProps) {
    const [language, setLanguage] = useState<Language>(languageOptions[0].value);
    const [code, setCode] = useState<string>(languageOptions[0].snippet);

    const [activeTab, setActiveTab] = useState<"testcases" | "test-result">("testcases");
    const [activeTestCase, setActiveTestCase] = useState<number>(0);

    const handleRunClick = () => {
        setActiveTab("test-result");
        onRunTest(language, code);
    };

    const handleSubmitClick = () => {
        setActiveTab("test-result");
        onSubmit(language === "cpp" ? "c++" : language, code);
    };

    const handleLanguageChange = (value: Language) => {
        setLanguage(value);
        const option = languageOptions.find((opt) => opt.value === value);
        setCode(option?.snippet || "");
    };

    const mockTestCases = [
        { input: "n = 5", expectedOutput: "120" },
        { input: "n = 3", expectedOutput: "6" },
        { input: "n = 0", expectedOutput: "1" },
    ];

    const displayTestCases = question?.sampleTestCases?.length ? question.sampleTestCases : (question?.testCases?.length ? question.testCases : mockTestCases);

    console.log(submissionResult)

    return (
        <div className="flex flex-col h-full bg-(--bg-secondary)">
            {/* Top Bar: Language Selector & Actions */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-(--border-primary) bg-(--bg-tertiary)/50">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider">Language:</span>
                    <Select value={language} onValueChange={(val) => handleLanguageChange(val as Language)}>
                        <SelectTrigger className="w-[120px] h-8 text-xs bg-(--bg-primary)">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languageOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleRunClick}
                        disabled={isRunning || isSubmitting}
                        className="font-medium h-8"
                    >
                        {isRunning ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Play className="w-3.5 h-3.5 mr-1.5" />}
                        Run Test
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleSubmitClick}
                        disabled={isRunning || isSubmitting}
                        className="font-medium bg-emerald-600 hover:bg-emerald-700 text-white h-8 border-none"
                    >
                        {isSubmitting ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Send className="w-3.5 h-3.5 mr-1.5" />}
                        Submit
                    </Button>
                </div>
            </div>

            {/* Editor Area & Test Cases Split */}
            <div className="flex-1 min-h-0 relative flex flex-col bg-(--bg-secondary)">
                <ResizablePanelGroup orientation="vertical">
                    {/* Top Panel: Monaco Editor */}
                    <ResizablePanel defaultSize={60} minSize={30}>
                        <div className="h-full relative border-b border-(--dk-border) bg-(--bg-secondary)">
                            <Editor
                                theme="vs-dark"
                                height="100%"
                                defaultLanguage="cpp"
                                language={language}
                                value={code}
                                onChange={(value) => setCode(value || "")}
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 16, bottom: 16 },
                                }}
                            />
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle className="bg-(--border-primary) hover:bg-(--text-tertiary)/30 transition-colors h-1.5 flex items-center justify-center" />


                    {/* Bottom Panel: Test Cases / Console */}
                    <ResizablePanel defaultSize={40} minSize={15}>
                        <div className="h-full bg-(--bg-secondary) flex flex-col font-pj">
                            {/* Panel Header */}
                            <div className="px-4 py-[6px] border-b border-(--border-primary) flex items-center gap-4 bg-(--bg-tertiary)/30">
                                <button
                                    onClick={() => setActiveTab("testcases")}
                                    className={`text-[13px] font-bold tracking-wide pb-1.5 -mb-[7px] flex items-center gap-2 transition-colors ${activeTab === "testcases"
                                        ? "text-(--text-primary) border-b-2 border-emerald-500"
                                        : "text-(--text-tertiary) hover:text-(--text-secondary) border-b-2 border-transparent"
                                        }`}
                                >
                                    <TerminalSquare className="w-4 h-4" />
                                    Testcases
                                </button>
                                <button
                                    onClick={() => setActiveTab("test-result")}
                                    className={`text-[13px] font-bold tracking-wide pb-1.5 -mb-[7px] transition-colors ${activeTab === "test-result"
                                        ? "text-(--text-primary) border-b-2 border-emerald-500"
                                        : "text-(--text-tertiary) hover:text-(--text-secondary) border-b-2 border-transparent"
                                        }`}
                                >
                                    Test Result
                                </button>
                            </div>

                            {/* Panel Body */}
                            <div className="flex-1 overflow-auto p-5">
                                {activeTab === "testcases" ? (
                                    <>
                                        <div className="flex gap-2 mb-5">
                                            {displayTestCases.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setActiveTestCase(index)}
                                                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${activeTestCase === index
                                                        ? "bg-(--bg-tertiary) text-(--text-primary)"
                                                        : "hover:bg-(--bg-tertiary)/50 text-(--text-secondary) hover:text-(--text-primary)"
                                                        }`}
                                                >
                                                    Case {index + 1}
                                                </button>
                                            ))}
                                        </div>
                                        {displayTestCases.length > 0 && activeTestCase < displayTestCases.length && (
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <p className="text-xs text-(--text-tertiary) font-bold uppercase tracking-wider">Input</p>
                                                    <div className="px-3 py-2.5 rounded-md bg-(--bg-primary) font-mono text-sm text-(--text-primary) border border-(--border-primary)">
                                                        {displayTestCases[activeTestCase].input}
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <p className="text-xs text-(--text-tertiary) font-bold uppercase tracking-wider">Expected Output</p>
                                                    <div className="px-3 py-2.5 rounded-md bg-(--bg-primary) font-mono text-sm text-(--text-primary) border border-(--border-primary)">
                                                        {displayTestCases[activeTestCase].expectedOutput}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="h-full">
                                        {isSubmitting || isRunning ? (
                                            <div className="flex flex-col items-center justify-center h-full text-(--text-tertiary) space-y-4">
                                                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                                                <span className="text-sm font-medium animate-pulse text-(--text-secondary)">
                                                    {isSubmitting ? "Testing all test cases..." : "Running test cases..."}
                                                </span>
                                            </div>
                                        ) : submissionResult ? (
                                            <div className="flex flex-col h-full space-y-6">
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${submissionResult?.status === 'ACCEPTED' || (submissionResult?.passedTestCases !== undefined && Number(submissionResult?.passedTestCases) === Number(submissionResult?.totalTestCases)) ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                                                        <span className={`${submissionResult?.status === 'ACCEPTED' || (submissionResult?.passedTestCases !== undefined && Number(submissionResult?.passedTestCases) === Number(submissionResult?.totalTestCases)) ? 'text-emerald-500' : 'text-rose-500'} font-bold text-xl tracking-tight`}>
                                                            {submissionResult?.status === 'ACCEPTED' || (submissionResult?.passedTestCases !== undefined && Number(submissionResult?.passedTestCases) === Number(submissionResult?.totalTestCases)) ? 'Accepted' : submissionResult?.status || 'Completed'}
                                                        </span>
                                                    </div>

                                                    {submissionResult?.passedTestCases !== undefined && submissionResult?.totalTestCases !== undefined && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center gap-1.5 bg-(--bg-tertiary)/50 px-3 py-1.5 rounded-md border border-(--border-primary)">
                                                                <span className={`font-bold ${Number(submissionResult.passedTestCases) === Number(submissionResult.totalTestCases) ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                                    {submissionResult.passedTestCases}
                                                                </span>
                                                                <span className="text-(--text-secondary) text-sm font-medium">
                                                                    / {submissionResult.totalTestCases} test cases passed
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {(submissionResult?.status === 'ACCEPTED' || (submissionResult?.passedTestCases !== undefined && Number(submissionResult?.passedTestCases) === Number(submissionResult?.totalTestCases))) && (
                                                    <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center space-y-3 text-center transition-all animate-in fade-in slide-in-from-bottom-2">
                                                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-1">
                                                            <span className="text-2xl">🎉</span>
                                                        </div>
                                                        <h3 className="text-emerald-500 font-bold text-lg">Congratulations!</h3>
                                                        <p className="text-sm text-(--text-secondary) max-w-[250px] leading-relaxed">
                                                            Your solution successfully passed all the test cases.
                                                        </p>
                                                    </div>
                                                )}

                                                {!(submissionResult?.status === 'ACCEPTED' || (submissionResult?.passedTestCases !== undefined && Number(submissionResult?.passedTestCases) === Number(submissionResult?.totalTestCases))) && (
                                                    <div className="p-4 rounded-md bg-(--bg-primary) border border-(--border-primary) flex-1 min-h-0 overflow-auto animate-in fade-in">
                                                        <p className="text-xs font-bold text-(--text-tertiary) uppercase tracking-wider mb-3">Submission Details</p>
                                                        <pre className="text-[13px] font-mono text-(--text-secondary) whitespace-pre-wrap">
                                                            {typeof submissionResult === 'object' ? JSON.stringify(submissionResult, null, 2) : String(submissionResult)}
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        ) : submissionError ? (
                                            <div className="flex flex-col h-full space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                                    <span className="text-rose-500 font-bold text-lg">Submission Error</span>
                                                </div>
                                                <div className="p-4 rounded-md border border-rose-500/20 bg-rose-500/10 flex-1 min-h-0 overflow-auto">
                                                    <pre className="text-sm font-mono text-rose-500 whitespace-pre-wrap">
                                                        {submissionError?.response?.data?.message || submissionError?.message || JSON.stringify(submissionError, null, 2)}
                                                    </pre>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-(--text-tertiary) space-y-3">
                                                <div className="p-3 bg-(--bg-primary) rounded-full border border-(--border-primary)">
                                                    <TerminalSquare className="w-6 h-6 opacity-60" />
                                                </div>
                                                <span className="text-sm font-medium">Run code or submit to see test results.</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>

        </div>
    );
}
