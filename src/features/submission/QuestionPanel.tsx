import type { IProblem } from "@/types/problems";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, FileText, History, Star } from "lucide-react";
import SubmissionHistory from "./SubmissionHistory";


export default function QuestionPanel({ question, isSolved }: { question: IProblem; isSolved?: boolean }) {
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


            </div>

            {/* Description Tab */}
            <TabsContent value="description" className="flex-1 overflow-hidden m-0 p-0 border-none outline-none bg-(--bg-secondary)">
                <ScrollArea className="h-full">
                    <div className="p-6 space-y-6 pb-12">
                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-[22px] font-bold text-(--text-primary) tracking-tight">
                                {question.orderIndex ? `${question.orderIndex}. ` : ''}{question.title}
                            </h1>
                            <div className="flex items-center gap-3 mt-2">
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
                                {question.topic && (
                                    <Badge
                                        variant="outline"
                                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border-0 tracking-wide bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 capitalize"
                                    >
                                        {question.topic.name}
                                    </Badge>
                                )}
                                <button title="Add to favorites">
                                    <Badge
                                        variant="outline"
                                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border-0 tracking-wide bg-gray-500/10 text-gray-600 dark:text-gray-400 hover:bg-gray-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <Star className="w-3.5 h-3.5" />
                                        Favorite
                                    </Badge>
                                </button>
                                {isSolved && (
                                    <Badge
                                        variant="outline"
                                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border-0 tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in fade-in zoom-in duration-300"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Solved
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Problem Statement */}
                        <section className="space-y-4 font-pj">
                            <div className="text-(--text-primary) text-[16px] leading-7">
                                {/* Replace with actual description if available, currently using placeholder text from original file */}
                                <p>
                                    {question.description}
                                </p>
                            </div>
                        </section>

                        {/* Instructions */}
                        {question.instructions && (
                            <section className="space-y-3 pt-4">
                                <h3 className="text-sm font-bold text-(--text-primary) uppercase tracking-wide">Instructions</h3>
                                <ul className="list-inside space-y-1.5 text-[15px] text-(--text-secondary) ml-2">
                                    {question.instructions.split('\n').filter(item => item.trim().length > 0).map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-(--text-tertiary) mt-2 shrink-0" />
                                            <span dangerouslySetInnerHTML={{ __html: item.trim() }} />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

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

                        {/* Examples */}
                        {displayTestCases && displayTestCases.length > 0 && (
                            <section className="space-y-6 pt-4">
                                <div className="space-y-4">
                                    {displayTestCases.slice(0, 2).map((testCase, index) => (
                                        <div key={index}>
                                            <h3 className="text-[15px] font-bold text-(--text-primary) mb-3">Example {index + 1}:</h3>
                                            <div className="pl-4 border-l-2 border-(--border-primary) flex flex-col gap-2">
                                                <div className="flex flex-col sm:flex-row sm:gap-2">
                                                    <span className="font-bold text-(--text-primary) text-[14px]">Input:</span>
                                                    <code className="text-[15px] text-(--text-secondary) font-mono whitespace-pre-wrap">{testCase.input}</code>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:gap-2">
                                                    <span className="font-bold text-(--text-primary) text-[14px]">Output:</span>
                                                    <code className="text-[15px] text-(--text-secondary) font-mono whitespace-pre-wrap">{testCase.expectedOutput}</code>
                                                </div>
                                                {testCase.explanation && (
                                                    <div className="mt-1">
                                                        <span className="font-bold text-(--text-primary) text-[14px] mr-2">Explanation:</span>
                                                        <span className="text-[15px] text-(--text-secondary) leading-relaxed">{testCase.explanation}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Constraints & Keywords */}
                        {(question.constraints || question.requiredKeywords) && (
                            <section className="space-y-3 pt-4">
                                <h3 className="text-sm font-bold text-(--text-primary) uppercase tracking-wide">Constraints</h3>
                                <ul className="list-inside space-y-1.5 text-[15px] text-(--text-secondary) ml-2">
                                    {question.constraints && question.constraints.split(/[\n.]/).filter(item => item.trim().length > 0).map((item, index) => (
                                        <li key={`constraint-${index}`} className="flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-(--text-tertiary) mt-2 shrink-0" />
                                            <span dangerouslySetInnerHTML={{ __html: item.trim() }} />
                                        </li>
                                    ))}

                                    {question.requiredKeywords && (
                                        <li className="flex items-start gap-2 mt-1">
                                            <div className="w-1 h-1 rounded-full bg-(--text-tertiary) mt-2 shrink-0" />
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span>Required Keywords:</span>
                                                {question.requiredKeywords.split(',').map((keyword, index) => (
                                                    <Badge key={`keyword-${index}`} variant="secondary" className="font-mono text-[13px] bg-(--bg-primary) text-(--text-secondary) border border-(--border-primary) px-2 py-0.5 rounded-md">
                                                        {keyword.trim()}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </section>
                        )}
                    </div>
                </ScrollArea>
            </TabsContent>

            {/* Submissions Tab */}
            <TabsContent value="submissions" className="flex-1 overflow-hidden m-0 p-0 border-none outline-none bg-(--bg-secondary)">
                <SubmissionHistory problemId={question.id} />
            </TabsContent>
        </Tabs>
    );
}
