import type { IProblem } from "@/types/problems";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Terminal, FileText, History } from "lucide-react";


export default function QuestionPanel({ question }: { question: IProblem }) {
    console.log(question);
    return (
        <Tabs defaultValue="description" className="h-full flex flex-col">
            {/* Top Navigation Tabs */}
            <div className="px-3 shrink-0 flex items-center h-10 border-b border-(--dk-border)">
                <TabsList className="bg-transparent h-full p-0 flex items-center justify-start gap-1">
                    <TabsTrigger
                        value="description"
                        className="text-[13px] font-medium tracking-wide data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-(--text-primary) text-(--text-secondary) hover:text-(--text-primary) transition-colors h-8 px-3 rounded-md flex items-center gap-1.5"
                    >
                        <FileText className="w-3.5 h-3.5 text-(--status-info-text)" />
                        Description
                    </TabsTrigger>

                    <div className="w-px h-3.5 bg-(--border-primary) mx-1"></div>

                    <TabsTrigger
                        value="submissions"
                        className="text-[13px] font-medium tracking-wide data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-(--text-primary) text-(--text-secondary) hover:text-(--text-primary) transition-colors h-8 px-3 rounded-md flex items-center gap-1.5"
                    >
                        <History className="w-3.5 h-3.5 text-(--text-tertiary)" />
                        Submissions
                    </TabsTrigger>
                </TabsList>
            </div>

            {/* Description Tab */}
            <TabsContent value="description" className="flex-1 overflow-hidden m-0 p-0 border-none outline-none bg-(--bg-secondary)">
                <ScrollArea className="h-full">
                    <div className="p-6 space-y-8 pb-12">
                        {/* Header */}
                        <div className="space-y-3">
                            <h1 className="text-2xl font-bold text-(--text-primary) font-pj">{question.title}</h1>
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant="outline"
                                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border-0 uppercase tracking-wide ${question.difficulty === 'EASY' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                                        question.difficulty === 'MEDIUM' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                                            'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                        }`}
                                >
                                    {question.difficulty}
                                </Badge>
                            </div>
                        </div>

                        {/* Problem Statement */}
                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-(--text-primary)">Problem Statement</h2>
                            <div className="text-(--text-secondary) leading-relaxed">
                                {/* Replace with actual description if available, currently using placeholder text from original file */}
                                <p>
                                    {question.description}
                                </p>
                            </div>
                        </section>

                        {/* Input/Output Format */}
                        {/* <section className="space-y-4">
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
                </section> */}

                        {/* <section className="space-y-4">
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
                </section> */}

                        {/* Constraints */}
                        <section className="space-y-4">
                            <h3 className="text-base font-semibold text-(--text-primary)">Constraints</h3>
                            <ul className="grid grid-cols-1 gap-2.5 text-sm text-(--text-secondary)">
                                {question.constraints?.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span dangerouslySetInnerHTML={{ __html: item }} />
                                    </li>
                                )) ?? (
                                        <>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                <span>1 ≤ n ≤ 10<sup>9</sup></span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                <span>Time Limit: 1s</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                <span>Memory Limit: 256 MB</span>
                                            </li>
                                        </>
                                    )}
                            </ul>
                        </section>

                        {/* Examples */}
                        <section className="space-y-6">
                            {/* Placeholder examples - ideally these should come from question data */}
                            <div className="rounded-xl border border-(--border-primary) overflow-hidden bg-(--bg-primary) shadow-sm">
                                <div className="bg-(--bg-secondary) px-4 py-2.5 border-b border-(--border-primary) flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-(--text-secondary)" />
                                    <h3 className="text-sm font-semibold text-(--text-primary)">Example 1</h3>
                                </div>
                                <div className="p-5 space-y-5">
                                    <div className="space-y-2">
                                        <span className="text-xs font-semibold text-(--text-tertiary) uppercase tracking-wider">Input</span>
                                        <pre className="bg-(--bg-tertiary)/50 rounded-lg p-3.5 text-sm font-mono text-(--text-primary) border-l-2 border-(--btn-primary-bg) overflow-x-auto whitespace-pre-wrap">5</pre>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-xs font-semibold text-(--text-tertiary) uppercase tracking-wider">Output</span>
                                        <pre className="bg-(--bg-tertiary)/50 rounded-lg p-3.5 text-sm font-mono text-(--text-primary) border-l-2 border-emerald-500 overflow-x-auto whitespace-pre-wrap">120</pre>
                                    </div>
                                    <div className="pt-2 text-sm text-(--text-secondary) leading-relaxed">
                                        <span className="font-semibold text-(--text-primary)">Explanation:</span> For input 5, the output is 120.
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </ScrollArea>
            </TabsContent>

            {/* Submissions Tab */}
            <TabsContent value="submissions" className="flex-1 overflow-hidden m-0 p-0 border-none outline-none">
                <div className="flex flex-col items-center justify-center h-full text-(--text-tertiary) space-y-3 p-6 text-center">
                    <div className="p-4 bg-(--bg-secondary) rounded-full">
                        <Terminal className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="font-medium text-(--text-secondary)">No submissions yet</p>
                    <p className="text-sm max-w-[250px]">Write and submit your first solution using the editor on the right.</p>
                </div>
            </TabsContent>
        </Tabs>
    );
}
