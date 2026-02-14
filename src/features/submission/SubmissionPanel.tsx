
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
import { Button } from "@/components/ui/button";
import { Loader2, Play, Send } from "lucide-react";

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
            {/* Top Bar: Language Selector */}
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
            </div>

            {/* Editor Area */}
            <div className="flex-1 min-h-0 relative">
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

            {/* Bottom Bar: Actions */}
            <div className="px-4 py-3 border-t border-(--border-primary) bg-(--bg-tertiary)/50 flex items-center justify-end gap-3">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onRunTest(language, code)}
                    disabled={isRunning || isSubmitting}
                    className="font-medium"
                >
                    {isRunning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                    Run Test
                </Button>
                <Button
                    size="sm"
                    onClick={() => onSubmit(language, code)}
                    disabled={isRunning || isSubmitting}
                    className="font-medium bg-green-600 hover:bg-green-700 text-white"
                >
                    {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                    Submit
                </Button>
            </div>
        </div>
    );
}
