import type { IProblem } from "@/types/problems";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, FileText, History } from "lucide-react";


export default function QuestionPanel({ question }: { question: IProblem }) {
    const displayTestCases = question.sampleTestCases?.length ? question.sampleTestCases : question.testCases;
    return (
        <Tabs defaultValue="description" className="h-full flex flex-col">
            {/* Top Navigation Tabs */}
            <div className="px-3 shrink-0 flex items-center h-10 border border-(--dk-border)">
                <TabsList className="bg-transparent h-full p-0 flex items-center justify-start gap-1 ">
                    <TabsTrigger
                        value="description"
                        className="text-[13px] font-medium tracking-wide data-[state=active]:bg-(--bg-secondary) border-none  data-[state=active]:shadow-none data-[state=active]:text-(--text-primary) text-(--text-secondary) hover:text-(--text-primary) transition-colors h-7 px-3 rounded-md flex items-center gap-1.5"
                    >
                        <FileText className="w-3.5 h-3.5 text-(--status-info-text)" />
                        Description
                    </TabsTrigger>

                    <div className="w-px h-3.5 bg-(--border-primary) mx-1"></div>

                    <TabsTrigger
                        value="submissions"
                        className="text-[13px] font-medium tracking-wide data-[state=active]:bg-transparent border-none data-[state=active]:shadow-none data-[state=active]:text-(--text-primary) text-(--text-secondary) hover:text-(--text-primary) transition-colors h-8 px-3 rounded-md flex items-center gap-1.5"
                    >
                        <History className="w-3.5 h-3.5 text-(--text-tertiary)" />
                        Submissions
                    </TabsTrigger>
                </TabsList>

                {/* Spacer to push badge to the right */}
                <div className="flex-1" />

                {/* Difficulty Badge */}
                <Badge
                    variant="outline"
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border-0 tracking-wide bg-opacity-10 ${question.difficulty === 'EASY' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        question.difficulty === 'MEDIUM' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                            'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        }`}
                >
                    {question.difficulty}
                </Badge>
            </div>

            {/* Description Tab */}
            <TabsContent value="description" className="flex-1 overflow-hidden m-0 p-0 border-none outline-none bg-(--bg-secondary)">
                <ScrollArea className="h-full">
                    <div className="p-6 space-y-8 pb-12">
                        {/* Header */}
                        <div className="space-y-1 mt-2">
                            <h1 className="text-[22px] font-bold text-(--text-primary) tracking-tight">{question.title}</h1>
                        </div>

                        {/* Problem Statement */}
                        <section className="space-y-4 font-pj">
                            <div className="text-(--text-primary) text-[15px] leading-7">
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
                        {question.constraints && (
                            <section className="space-y-3 pt-4">
                                <h3 className="text-sm font-bold text-(--text-primary) uppercase tracking-wide">Constraints</h3>
                                <ul className="list-inside space-y-1.5 text-sm text-(--text-secondary) ml-2">
                                    {question.constraints.split(/[\n.]/).filter(item => item.trim().length > 0).map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-(--text-tertiary) mt-2 shrink-0" />
                                            <span dangerouslySetInnerHTML={{ __html: item.trim() }} />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Examples */}
                        {displayTestCases && displayTestCases.length > 0 && (
                            <section className="space-y-6 pt-4">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-[15px] font-bold text-(--text-primary) mb-3">Example 1:</h3>
                                        <div className="pl-4 border-l-2 border-(--border-primary) flex flex-col gap-2">
                                            <div className="flex flex-col sm:flex-row sm:gap-2">
                                                <span className="font-bold text-(--text-primary) text-[14px]">Input:</span>
                                                <code className="text-[13px] text-(--text-secondary) font-mono whitespace-pre-wrap">{displayTestCases[0].input}</code>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:gap-2">
                                                <span className="font-bold text-(--text-primary) text-[14px]">Output:</span>
                                                <code className="text-[13px] text-(--text-secondary) font-mono whitespace-pre-wrap">{displayTestCases[0].expectedOutput}</code>
                                            </div>
                                            {displayTestCases[0].explanation && (
                                                <div className="flex flex-col mt-1">
                                                    <span className="font-bold text-(--text-primary) text-[14px]">Explanation:</span>
                                                    <span className="text-[14px] text-(--text-secondary) leading-relaxed">{displayTestCases[0].explanation}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
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
