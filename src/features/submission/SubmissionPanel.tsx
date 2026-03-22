
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import type { Language, ISubmissionResponse } from "@/types/submission";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TerminalSquare } from "lucide-react";

import type { IProblem } from "@/types/problems";
import { languageOptions } from "./languageOptions";
import { useCodeStorage } from "@/hooks/useCodeStorage";
import EditorToolbar from "./EditorToolbar";
import TestCasesTab from "./TestCasesTab";
import TestResultTab from "./TestResultTab";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SubmissionPanelProps {
    problemId?: string;
    question?: IProblem;
    defaultCode?: string;
    onRunTest: (language: Language, code: string) => Promise<void>;
    onSubmit: (language: Language, code: string) => Promise<void>;
    isRunning: boolean;
    isSubmitting: boolean;
    submissionResult?: any;
    submissionError?: any;
    submissions?: ISubmissionResponse[];
}

const defaultSnippets = Object.fromEntries(
    languageOptions.map((opt) => [opt.value, opt.snippet])
) as Record<Language, string>;

export default function SubmissionPanel({
    problemId,
    question,
    onRunTest,
    onSubmit,
    isRunning,
    isSubmitting,
    submissionResult,
    submissionError,
    submissions,
}: SubmissionPanelProps) {
    // Derive default language from localStorage, fallback to cpp if none or invalid
    const [initialLang] = useState<Language>(() => {
        try {
            const raw = localStorage.getItem("preferredLanguage");
            if (!raw) return "cpp";

            let normalized = raw.toLowerCase().trim();
            // Handle common "c++" vs "cpp" mismatch
            if (normalized === "c++") normalized = "cpp";

            // Verify the computed language is supported
            const isValid = languageOptions.some(opt => opt.value === normalized);
            return isValid ? (normalized as Language) : "cpp";
        } catch {
            return "cpp";
        }
    });

    const { code, setCode, language, changeLanguage, markSolved, saveStatus } = useCodeStorage(
        problemId,
        defaultSnippets,
        initialLang,
        submissions
    );
    const [activeTab, setActiveTab] = useState<"testcases" | "test-result">("testcases");
    const isMobile = useMediaQuery("(max-width: 1023px)");

    const editorRef = useRef<any>(null);

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleCodeChange = (value: string | undefined) => {
        const val = value || "";
        const snippet = defaultSnippets[language];
        
        if (!val.startsWith(snippet)) {
            // Prevent deleting or editing the boilerplate snippet
            if (editorRef.current) {
                const currentPosition = editorRef.current.getPosition();
                editorRef.current.setValue(code);
                
                const snippetLines = snippet.split("\n").length;
                if (currentPosition.lineNumber < snippetLines) {
                    editorRef.current.setPosition({ lineNumber: snippetLines, column: 1 });
                } else {
                    editorRef.current.setPosition(currentPosition);
                }
            }
            return;
        }
        setCode(val);
    };

    // Mark as solved when submission is ACCEPTED
    useEffect(() => {
        if (
            submissionResult &&
            (submissionResult.status === "ACCEPTED" ||
                (submissionResult.passedTestCases !== undefined &&
                    Number(submissionResult.passedTestCases) === Number(submissionResult.totalTestCases)))
        ) {
            markSolved(code, language);
        }
    }, [submissionResult]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleRunTestClick = () => {
        setActiveTab("test-result");
        onRunTest(language === "cpp" ? "c++" : language, code);
    };

    const handleSubmitClick = () => {
        setActiveTab("test-result");
        onSubmit(language === "cpp" ? "c++" : language, code);
    };

    const handleLanguageChange = (value: Language) => {
        changeLanguage(value);
    };

    const displayTestCases = question?.sampleTestCases?.length
        ? question.sampleTestCases
        : question?.testCases?.length
            ? question.testCases
            : [];

    return (
        <div className="flex flex-col h-full bg-(--bg-secondary)">
            {/* Top Bar */}
            <EditorToolbar
                language={language}
                onLanguageChange={handleLanguageChange}
                onSubmit={handleSubmitClick}
                onRunTest={handleRunTestClick}
                isRunning={isRunning}
                isSubmitting={isSubmitting}
                saveStatus={saveStatus}
            />

            {/* Editor & Bottom Panel */}
            <div className={`${isMobile ? '' : 'flex-1 min-h-0'} relative flex flex-col bg-(--bg-secondary)`}>
                {isMobile ? (
                    /* ── Mobile: stacked layout with fixed editor height ── */
                    <>
                        {/* Monaco Editor */}
                        <div className="h-[50vh] relative border-b border-(--dk-border) bg-(--bg-secondary)">
                            <Editor
                                theme="vs-dark"
                                height="100%"
                                defaultLanguage={initialLang}
                                language={language}
                                value={code}
                                onMount={handleEditorDidMount}
                                onChange={handleCodeChange}
                                options={{
                                    fontSize: 13,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 12, bottom: 12 },
                                }}
                            />
                        </div>

                        {/* Bottom Panel: Test Cases / Results */}
                        <div className="bg-(--bg-secondary) flex flex-col font-pj">
                            {/* Tab Header */}
                            <div className="px-2 sm:px-4 py-[6px] border-b border-(--border-primary) flex items-center gap-4 bg-(--bg-tertiary)/30">
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
                            <div className="overflow-auto p-3 min-h-[120px]">
                                {activeTab === "testcases" ? (
                                    displayTestCases.length > 0 ? (
                                        <TestCasesTab testCases={displayTestCases} />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm font-medium text-(--text-tertiary)">
                                            No test cases available for this
                                        </div>
                                    )
                                ) : (
                                    <div>
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
                    </>
                ) : (
                    /* ── Desktop: resizable vertical split ── */
                    <ResizablePanelGroup orientation="vertical">
                        {/* Monaco Editor */}
                        <ResizablePanel defaultSize={60} minSize={30}>
                            <div className="h-full relative border-b border-(--dk-border) bg-(--bg-secondary)">
                                <Editor
                                    theme="vs-dark"
                                    height="100%"
                                    defaultLanguage={initialLang}
                                    language={language}
                                    value={code}
                                    onMount={handleEditorDidMount}
                                    onChange={handleCodeChange}
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
                                        displayTestCases.length > 0 ? (
                                            <TestCasesTab testCases={displayTestCases} />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm font-medium text-(--text-tertiary)">
                                                No test cases available for this
                                            </div>
                                        )
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
                )}
            </div>
        </div>
    );
}
