
import { useState } from "react";
import Editor from "@monaco-editor/react";
import type { Language } from "@/types/submission";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TerminalSquare } from "lucide-react";

import type { IProblem } from "@/types/problems";
import { languageOptions } from "./languageOptions";
import EditorToolbar from "./EditorToolbar";
import TestCasesTab from "./TestCasesTab";
import TestResultTab from "./TestResultTab";

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

const mockTestCases = [
    { input: "n = 5", expectedOutput: "120" },
    { input: "n = 3", expectedOutput: "6" },
    { input: "n = 0", expectedOutput: "1" },
];

export default function SubmissionPanel({
    question,
    onSubmit,
    isRunning,
    isSubmitting,
    submissionResult,
    submissionError,
}: SubmissionPanelProps) {
    const [language, setLanguage] = useState<Language>(languageOptions[0].value);
    const [code, setCode] = useState<string>(languageOptions[0].snippet);
    const [activeTab, setActiveTab] = useState<"testcases" | "test-result">("testcases");

    const handleSubmitClick = () => {
        setActiveTab("test-result");
        onSubmit(language === "cpp" ? "c++" : language, code);
    };

    const handleLanguageChange = (value: Language) => {
        setLanguage(value);
        const option = languageOptions.find((opt) => opt.value === value);
        setCode(option?.snippet || "");
    };

    const displayTestCases = question?.sampleTestCases?.length
        ? question.sampleTestCases
        : question?.testCases?.length
            ? question.testCases
            : mockTestCases;

    return (
        <div className="flex flex-col h-full bg-(--bg-secondary)">
            {/* Top Bar */}
            <EditorToolbar
                language={language}
                onLanguageChange={handleLanguageChange}
                onSubmit={handleSubmitClick}
                isRunning={isRunning}
                isSubmitting={isSubmitting}
            />

            {/* Editor & Bottom Panel */}
            <div className="flex-1 min-h-0 relative flex flex-col bg-(--bg-secondary)">
                <ResizablePanelGroup orientation="vertical">
                    {/* Monaco Editor */}
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

                    <ResizableHandle
                        withHandle
                        className="bg-(--border-primary) hover:bg-(--text-tertiary)/30 transition-colors h-1.5 flex items-center justify-center"
                    />

                    {/* Bottom Panel: Test Cases / Results */}
                    <ResizablePanel defaultSize={40} minSize={15}>
                        <div className="h-full bg-(--bg-secondary) flex flex-col font-pj">
                            {/* Tab Header */}
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

                            {/* Tab Body */}
                            <div className="flex-1 overflow-auto p-5">
                                {activeTab === "testcases" ? (
                                    <TestCasesTab testCases={displayTestCases} />
                                ) : (
                                    <div className="h-full">
                                        <TestResultTab
                                            isSubmitting={isSubmitting}
                                            isRunning={isRunning}
                                            submissionResult={submissionResult}
                                            submissionError={submissionError}
                                        />
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
