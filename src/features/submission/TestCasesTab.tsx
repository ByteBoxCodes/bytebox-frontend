import { useState } from "react";
import type { TestCase } from "@/types/submission";

const formatText = (text: string | null | undefined) => {
    if (!text) return text;
    return String(text).replace(/(?:\\n|\n)/g, '\n').trim();
};

interface TestCasesTabProps {
    testCases: TestCase[];
}

export default function TestCasesTab({ testCases }: TestCasesTabProps) {
    const [activeTestCase, setActiveTestCase] = useState<number>(0);

    return (
        <>
            <div className="flex gap-2 mb-5">
                {testCases.map((_, index) => (
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
            {testCases.length > 0 && activeTestCase < testCases.length && (
                <div className="space-y-4">
                    {testCases[activeTestCase].input && (
                        <div className="space-y-1.5">
                            <p className="text-xs text-(--text-tertiary) font-bold uppercase tracking-wider">
                                Input
                            </p>
                            <div className="px-3 py-2.5 rounded-md bg-(--bg-primary) font-mono text-sm text-(--text-primary) border border-(--border-primary) whitespace-pre-wrap">
                                {formatText(testCases[activeTestCase].input)}
                            </div>
                        </div>
                    )}
                    <div className="space-y-1.5">
                        <p className="text-xs text-(--text-tertiary) font-bold uppercase tracking-wider">
                            Expected Output
                        </p>
                        <div className="px-3 py-2.5 rounded-md bg-(--bg-primary) font-mono text-sm text-(--text-primary) border border-(--border-primary) whitespace-pre-wrap">
                            {formatText(testCases[activeTestCase].expectedOutput)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
