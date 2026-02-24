import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { IProblem } from "@/types/problems";
import { CheckCircle2, Circle } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";

export default function ProblemList({ problems, topicName }: { problems: IProblem[], topicName: string }) {
    const { data: userData } = useProfile();
    const user = userData?.data ?? userData;

    const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
    const [statusFilter, setStatusFilter] = useState<string>("All");

    // Simulate solved status (ideally this comes from backend user profile)
    const isSolved = (id: string) => {
        if (!user) return false;
        return parseInt(id) % 3 === 0;
    };

    const getDifficultyColor = (diff: IProblem["difficulty"]) => {
        switch (diff) {
            case "EASY":
                return "text-emerald-500 bg-emerald-500/10";
            case "MEDIUM":
                return "text-amber-500 bg-amber-500/10";
            case "HARD":
                return "text-red-500 bg-red-500/10";
            default:
                return "bg-secondary text-secondary-foreground";
        }
    };

    // Derived filtered problems
    const filteredProblems = problems?.filter((p: IProblem) => {
        const passDifficulty = difficultyFilter === "All" || p.difficulty === difficultyFilter;
        let passStatus = true;
        if (statusFilter === "Solved") passStatus = isSolved(p.id);
        if (statusFilter === "Unsolved") passStatus = !isSolved(p.id);

        return passDifficulty && passStatus;
    });

    return (
        <div className="space-y-4">
            {/* Header Area */}
            <div className="pb-4">
                <div className="flex items-center gap-2 justify-between pb-2">
                    <h2 className="text-2xl font-bold text-foreground font-pj tracking-tight capitalize">
                        {topicName} Questions
                    </h2>
                    <div className="flex justify-end items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-muted-foreground hidden sm:inline-block">Status:</span>
                            <Select value={statusFilter} onValueChange={setStatusFilter} >
                                <SelectTrigger className="w-max h-8 cursor-pointer text-xs rounded-full bg-muted/30 border-0 focus:ring-1 pl-4 ">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent align="end" className="rounded-xl cursor-pointer">
                                    <SelectItem value="All" className="text-xs">All</SelectItem>
                                    <SelectItem value="Solved" className="text-xs">Solved</SelectItem>
                                    <SelectItem value="Unsolved" className="text-xs">Unsolved</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-muted-foreground hidden sm:inline-block">Difficulty:</span>
                            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                                <SelectTrigger className="w-max h-8 cursor-pointer text-xs rounded-full bg-muted/30 border-0 focus:ring-1 pl-4">
                                    <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent align="end" className="rounded-xl cursor-pointer">
                                    <SelectItem value="All" className="text-xs">All</SelectItem>
                                    <SelectItem value="EASY" className="text-xs">Easy</SelectItem>
                                    <SelectItem value="MEDIUM" className="text-xs">Medium</SelectItem>
                                    <SelectItem value="HARD" className="text-xs">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <p className="mt-2 text-muted-foreground font-pj text-sm max-w-2xl">
                    Master {topicName.toLowerCase()} concepts with these curated challenges. <br />
                    Start from easy problems and work your way up to build a solid foundation.
                </p>
            </div>

            {/* Filters Area */}


            {/* Table Area (Striped, Cardless style) */}
            <div className="rounded-lg border-y border-border overflow-hidden">
                <Table>
                    <TableHeader className="bg-transparent border-b border-border">
                        <TableRow className="hover:bg-transparent border-0 [&_th]:h-10">
                            <TableHead className="w-[80px] text-center font-semibold text-muted-foreground">Status</TableHead>
                            <TableHead className="w-[60px] font-semibold text-muted-foreground">No.</TableHead>
                            <TableHead className="font-semibold text-muted-foreground">Title</TableHead>
                            <TableHead className="w-[120px] font-semibold text-muted-foreground">Difficulty</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProblems?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                                    No problems matching your filters.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProblems?.map((problem: IProblem, index: number) => {
                                const solved = isSolved(problem.id);
                                // Alternating stripe class (LeetCode style)
                                const isEven = index % 2 !== 0;

                                return (
                                    <TableRow
                                        key={problem.id}
                                        className={`group transition-colors cursor-pointer   border-0 ${isEven ? "bg-muted/50 hover:bg-muted/80" : "bg-(--bg-secondary) hover:bg-muted/10"
                                            }`}
                                    >
                                        <TableCell className="text-center py-3">
                                            <div className="flex justify-center">
                                                {solved ? (
                                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                                ) : (
                                                    <Circle size={18} className="text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-muted-foreground py-3">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Link
                                                to={`/problem/${problem.id}`}
                                                className="font-medium text-foreground hover:text-primary transition-colors block w-full outline-none"
                                            >
                                                {problem.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Badge
                                                variant="secondary"
                                                className={`font-medium ${getDifficultyColor(problem.difficulty)}`}
                                            >
                                                {problem.difficulty}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
