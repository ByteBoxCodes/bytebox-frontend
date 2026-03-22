import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IProblemList } from "@/types/problems";
import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import ProblemListSkeleton from "@/fallback/ProblemListSkeleton";

export default function ProblemList({
  problems,
  topicName,
  isLoading,
}: {
  problems: IProblemList[];
  topicName: string;
  isLoading?: boolean;
}) {
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const getDifficultyColor = (diff: IProblemList["difficulty"]) => {
    switch (diff) {
      case "EASY":
        return "text-emerald-500 bg-emerald-500/10";
      case "MEDIUM":
        return "text-amber-600 bg-amber-500/10";
      case "HARD":
        return "text-red-600 bg-red-500/10";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getXP = (diff: IProblemList["difficulty"]) => {
    switch (diff) {
      case "EASY":
        return 10;
      case "MEDIUM":
        return 15;
      case "HARD":
        return 20;
      default:
        return 0;
    }
  };

  // Derived filtered problems
  const filteredProblems = problems
    ?.filter((p: IProblemList) => {
      const passDifficulty =
        difficultyFilter === "All" || p.difficulty === difficultyFilter;
      let passStatus = true;
      if (statusFilter === "Solved") passStatus = p.solved;
      if (statusFilter === "Unsolved") passStatus = !p.solved;

      return passDifficulty && passStatus;
    })
    ?.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header Area */}
      <div className="pb-4 shrink-0">
        <div className="flex items-center gap-2 justify-between pb-2">
          <h2 className="text-2xl font-bold text-foreground font-pj tracking-tight capitalize">
            {topicName} Questions
          </h2>
          <div className="flex justify-end items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-muted-foreground hidden sm:inline-block">
                Status:
              </span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-max h-8 cursor-pointer text-xs rounded-full bg-muted/30 border-0 focus:ring-1 pl-4 ">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="rounded-xl cursor-pointer"
                >
                  <SelectItem value="All" className="text-xs">
                    All
                  </SelectItem>
                  <SelectItem value="Solved" className="text-xs">
                    Solved
                  </SelectItem>
                  <SelectItem value="Unsolved" className="text-xs">
                    Unsolved
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-muted-foreground hidden sm:inline-block">
                Difficulty:
              </span>
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-max h-8 cursor-pointer text-xs rounded-full bg-muted/30 border-0 focus:ring-1 pl-4">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="rounded-xl cursor-pointer"
                >
                  <SelectItem value="All" className="text-xs">
                    All
                  </SelectItem>
                  <SelectItem value="EASY" className="text-xs">
                    Easy
                  </SelectItem>
                  <SelectItem value="MEDIUM" className="text-xs">
                    Medium
                  </SelectItem>
                  <SelectItem value="HARD" className="text-xs">
                    Hard
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <p className="mt-2 text-muted-foreground font-pj text-sm max-w-2xl">
          Master {topicName.toLowerCase()} concepts with these curated
          challenges. <br />
          Start from easy problems and work your way up to build a solid
          foundation.
        </p>
      </div>

      {/* Filters Area */}

      {/* Table Area (Striped, Cardless style) */}
      <div className="flex-1 flex flex-col rounded-lg border border-border overflow-hidden min-h-0 overflow-x-auto">
        <Table className="hidden">
          {/* Hack to keep Table styles load, using manual structure below for scrolling */}
        </Table>

        {/* Fixed Header */}
        <div className="bg-transparent border-b border-border shrink-0">
          <table className="w-full text-sm text-left">
            <thead className="[&_tr]:border-b">
              <tr className="hover:bg-transparent border-0 [&_th]:h-10">
                <th className="h-10 px-2 sm:px-4 w-[50px] sm:w-[80px] text-center align-middle font-semibold text-muted-foreground">
                  Status
                </th>
                <th className="h-10 px-2 sm:px-4 w-[40px] sm:w-[60px] align-middle font-semibold text-muted-foreground hidden sm:table-cell">
                  No.
                </th>
                <th className="h-10 px-2 sm:px-4 align-middle font-semibold text-muted-foreground">
                  Title
                </th>
                <th className="h-10 px-2 sm:px-4 w-[60px] sm:w-[80px] align-middle text-center font-semibold text-muted-foreground">
                  Reward
                </th>
                <th className="h-10 px-2 sm:px-4 w-[90px] sm:w-[120px] align-middle font-semibold text-muted-foreground">
                  Difficulty
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm text-left">
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <ProblemListSkeleton />
              ) : filteredProblems?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="h-32 text-center align-middle text-muted-foreground"
                  >
                    No problems matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProblems?.map(
                  (problem: IProblemList, index: number) => {
                    const solved = problem.solved;
                    const isEven = index % 2 !== 0;

                    return (
                      <tr
                        key={problem.id}
                        className={`group transition-colors cursor-pointer border-0 ${
                          isEven
                            ? "bg-muted/50 hover:bg-muted/80"
                            : "bg-(--bg-secondary) hover:bg-muted/10"
                        }`}
                      >
                        <td className="w-[50px] sm:w-[80px] p-2 sm:p-4 text-center align-middle py-3">
                          <div className="flex justify-center">
                            {solved ? (
                              <CheckCircle2
                                size={18}
                                className="text-emerald-500"
                              />
                            ) : (
                              <Circle
                                size={18}
                                className="text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors"
                              />
                            )}
                          </div>
                        </td>
                        <td className="w-[40px] sm:w-[60px] p-2 sm:p-4 align-middle font-medium text-muted-foreground py-3 hidden sm:table-cell">
                          {index + 1}
                        </td>
                        <td className="p-2 sm:p-4 align-middle py-3">
                          <Link
                            to={`/problem/${problem.id}`}
                            className="font-medium text-foreground hover:text-primary transition-colors block w-full outline-none truncate"
                          >
                            {problem.title}
                          </Link>
                        </td>
                        <td className="w-[60px] sm:w-[80px] p-2 sm:p-4 align-middle py-3 text-center">
                          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                            {getXP(problem.difficulty)} XP
                          </span>
                        </td>
                        <td className="w-[90px] sm:w-[120px] p-2 sm:p-4 align-middle py-3">
                          <Badge
                            variant="secondary"
                            className={`font-medium w-max ${getDifficultyColor(problem.difficulty)}`}
                          >
                            {problem.difficulty}
                          </Badge>
                        </td>
                      </tr>
                    );
                  },
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
