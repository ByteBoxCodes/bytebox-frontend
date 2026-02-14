import { Link } from "react-router-dom";
import type { Question } from "../../types/submission";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface QuestionPanelProps {
    question: Question;
}

export default function QuestionPanel({ question }: QuestionPanelProps) {
    return (
        <ScrollArea className="h-full">
            <div className="p-6 space-y-8">
                {/* Header */}
                <div className="space-y-4">
                    <Link
                        to="/problems"
                        className="inline-flex items-center text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                    >
                        ← Back to Problems
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-(--text-primary) font-pj">{question.title}</h1>
                        <div className="flex flex-wrap gap-2 mt-3">
                            <Badge variant={question.difficulty === 'Easy' ? 'secondary' : question.difficulty === 'Medium' ? 'default' : 'destructive'}>
                                {question.difficulty}
                            </Badge>
                            <Badge variant="outline">{question.points} pts</Badge>
                            <Badge variant="outline">{question.isCompleted ? "Completed" : "Pending"}</Badge>
                        </div>
                    </div>
                </div>

                {/* Problem Statement */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-(--text-primary)">Problem Statement</h2>
                    <div className="text-(--text-secondary) leading-relaxed">
                        {/* Replace with actual description if available, currently using placeholder text from original file */}
                        <p>
                            Given an integer <code>n</code>, determine the result requested in the prompt. Make sure to handle edge cases such as negative values,
                            zero, and very large inputs while maintaining optimal time and space complexity.
                        </p>
                    </div>
                </section>

                {/* Input/Output Format */}
                <section className="space-y-4">
                    <h3 className="text-base font-semibold text-(--text-primary)">Input Format</h3>
                    <ul className="list-disc list-inside space-y-1 text-(--text-secondary)">
                        {question.inputFormat?.map((item, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                        )) ?? (
                                <>
                                    <li>Single line containing one integer <code>n</code>.</li>
                                    <li>Optional second line may contain additional parameters depending on the variation.</li>
                                </>
                            )}
                    </ul>
                </section>

                <section className="space-y-4">
                    <h3 className="text-base font-semibold text-(--text-primary)">Output Format</h3>
                    <ul className="list-disc list-inside space-y-1 text-(--text-secondary)">
                        {question.outputFormat?.map((item, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                        )) ?? (
                                <>
                                    <li>Print a single line with the computed answer.</li>
                                    <li>Include explanatory text only if the problem explicitly asks for it.</li>
                                </>
                            )}
                    </ul>
                </section>

                {/* Constraints */}
                <section className="space-y-4">
                    <h3 className="text-base font-semibold text-(--text-primary)">Constraints</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-(--text-secondary)">
                        {question.constraints?.map((item, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                        )) ?? (
                                <>
                                    <li>1 ≤ n ≤ 10<sup>9</sup></li>
                                    <li>Time Limit: 1s</li>
                                    <li>Memory Limit: 256 MB</li>
                                </>
                            )}
                    </ul>
                </section>

                {/* Examples */}
                <section className="space-y-6">
                    {/* Placeholder examples - ideally these should come from question data */}
                    <div className="space-y-2">
                        <h3 className="text-base font-semibold text-(--text-primary)">Sample Input</h3>
                        <pre className="bg-(--bg-tertiary) rounded-md p-3 text-sm font-mono text-(--text-primary) overflow-x-auto">5</pre>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-base font-semibold text-(--text-primary)">Sample Output</h3>
                        <pre className="bg-(--bg-tertiary) rounded-md p-3 text-sm font-mono text-(--text-primary) overflow-x-auto">120</pre>
                    </div>
                    <p className="text-sm text-(--text-secondary)">
                        Explanation: for input 5, the output is 120.
                    </p>
                </section>
            </div>
        </ScrollArea>
    );
}
