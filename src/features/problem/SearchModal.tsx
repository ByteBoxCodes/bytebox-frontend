import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchProblems } from "@/hooks/useSearchProblems";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/useDebounce";
import SearchModalSkeleton from "@/fallback/SearchModalSkeleton";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  // Reset query when modal closes
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const { data: results, isLoading } = useSearchProblems(debouncedQuery);

  const handleSelect = (problemId: string) => {
    onOpenChange(false);
    navigate(`/problem/${problemId}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search problems..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty className="py-12 text-center text-sm">
          {isLoading ? (
            <SearchModalSkeleton />
          ) : query.length > 0 ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-(--text-primary) font-semibold text-base">
                No problems found
              </p>
              <p className="text-(--text-tertiary)">
                We couldn't find any results for "{query}"
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-(--text-primary) font-semibold text-base">
                Search for problems
              </p>
              <p className="text-(--text-tertiary)">
                Find coding challenges by title, tags, or difficulty
              </p>
            </div>
          )}
        </CommandEmpty>

        {results && results.length > 0 && (
          <CommandGroup heading="Problems">
            {results.map((problem) => (
              <CommandItem
                key={problem.id}
                value={problem.title}
                onSelect={() => handleSelect(problem.id)}
                className="flex items-center justify-between px-4 py-3 cursor-pointer group hover:bg-(--bg-tertiary) transition-colors"
              >
                <div className="flex flex-col gap-0.5 max-w-[80%]">
                  <span className="font-semibold text-(--text-primary) group-hover:text-emerald-500 transition-colors truncate">
                    {problem.title}
                  </span>
                </div>
                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${
                      problem.difficulty === "EASY"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : problem.difficulty === "MEDIUM"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
