
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

interface SubmissionPanelProps {
    defaultCode?: string;
    onRunTest: (language: Language, code: string) => Promise<void>;
    onSubmit: (language: Language, code: string) => Promise<void>;
    isRunning: boolean;
    isSubmitting: boolean;
}

const languageOptions: LanguageOption[] = [
    { label: "C++", value: "cpp", snippet: "// Write your C++ solution here\n#include <iostream>\n\nusing namespace std;\n\nint main() {\n    // code here\n    return 0;\n}\n" },
    { label: "Java", value: "java", snippet: "// Write your Java solution here\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // code here\n    }\n}\n" },
];

export default function SubmissionPanel({
    onRunTest,
    onSubmit,
    isRunning,
    isSubmitting,
}: SubmissionPanelProps) {
    const [language, setLanguage] = useState<Language>(languageOptions[0].value);
    const [code, setCode] = useState<string>(languageOptions[0].snippet);

    const handleLanguageChange = (value: Language) => {
        setLanguage(value);
        const option = languageOptions.find((opt) => opt.value === value);
        setCode(option?.snippet || "");
    };


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
                        onClick={() => onRunTest(language, code)}
                        disabled={isRunning || isSubmitting}
                        className="font-medium h-8"
                    >
                        {isRunning ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Play className="w-3.5 h-3.5 mr-1.5" />}
                        Run Test
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => onSubmit(language === "cpp" ? "c++" : language, code)}
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
                    <ResizablePanel defaultSize={70} minSize={30}>
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
                    <ResizablePanel defaultSize={30} minSize={15}>
                        <div className="h-full bg-(--bg-secondary) flex flex-col font-pj">
                            {/* Panel Header */}
                            <div className="px-4 py-[6px] border-b border-(--border-primary) flex items-center gap-4 bg-(--bg-tertiary)/30">
                                <button className="text-[13px] font-bold text-(--text-primary) tracking-wide border-b-2 border-emerald-500 pb-1.5 -mb-[7px] flex items-center gap-2">
                                    <TerminalSquare className="w-4 h-4" />
                                    Testcases
                                </button>
                                <button className="text-[13px] font-bold text-(--text-tertiary) hover:text-(--text-secondary) tracking-wide pb-1.5 -mb-[7px]">
                                    Test Result
                                </button>
                            </div>

                            {/* Panel Body */}
                            <div className="flex-1 overflow-auto p-5">
                                <div className="flex gap-2 mb-5">
                                    <button className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-(--bg-tertiary) text-(--text-primary)">Case 1</button>
                                    <button className="px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-(--bg-tertiary)/50 text-(--text-secondary) hover:text-(--text-primary) transition-colors">Case 2</button>
                                    <button className="px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-(--bg-tertiary)/50 text-(--text-secondary) hover:text-(--text-primary) transition-colors">Case 3</button>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <p className="text-xs text-(--text-tertiary) font-bold uppercase tracking-wider">Input</p>
                                        <div className="px-3 py-2.5 rounded-md bg-(--bg-primary) font-mono text-sm text-(--text-primary) border border-(--border-primary)">
                                            n = 5
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <p className="text-xs text-(--text-tertiary) font-bold uppercase tracking-wider">Expected Output</p>
                                        <div className="px-3 py-2.5 rounded-md bg-(--bg-primary) font-mono text-sm text-(--text-primary) border border-(--border-primary)">
                                            120
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>

        </div>
    );
}
