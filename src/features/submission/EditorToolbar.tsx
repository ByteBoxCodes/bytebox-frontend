import type { Language } from "@/types/submission";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Play, Send, Braces } from "lucide-react";
import { languageOptions } from "./languageOptions";

interface EditorToolbarProps {
  language: Language;
  onLanguageChange: (value: Language) => void;
  onSubmit: () => void;
  onRunTest: () => void;
  onInsertBoilerplate: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
  saveStatus?: "idle" | "saving" | "saved";
}

export default function EditorToolbar({
  language,
  onLanguageChange,
  onSubmit,
  onRunTest,
  onInsertBoilerplate,
  isRunning,
  isSubmitting,
  saveStatus = "idle",
}: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between px-2 sm:px-4 py-2 border-b border-(--border-primary) bg-(--bg-tertiary)/50 gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider hidden sm:inline">
          Language:
        </span>
        <Select
          value={language}
          onValueChange={(val) => onLanguageChange(val as Language)}
        >
          <SelectTrigger className="w-[100px] sm:w-[120px] h-8 text-xs bg-(--bg-primary)">
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
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Save Status Indicator */}
        <span
          className={`text-[11px] font-medium flex items-center gap-1 transition-all duration-300 ${
            saveStatus === "saving"
              ? "text-(--text-tertiary) opacity-100"
              : saveStatus === "saved"
                ? "text-emerald-500 opacity-100"
                : "opacity-0"
          }`}
        >
          {saveStatus === "saving" && (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              Saving...
            </>
          )}
          {saveStatus === "saved" && (
            <>
              <Check className="w-3 h-3" />
              Saved
            </>
          )}
        </span>

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                onClick={onInsertBoilerplate}
                disabled={isRunning || isSubmitting}
                className="w-8 h-8 p-0 text-(--text-tertiary) hover:text-(--text-primary) hover:bg-(--bg-secondary) cursor-pointer"
                aria-label="Insert Boilerplate Code"
              >
                <Braces className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              Insert Boilerplate Code
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          size="sm"
          variant="secondary"
          onClick={onRunTest}
          disabled={isRunning || isSubmitting}
          className="font-medium bg-(--bg-primary) hover:bg-(--bg-secondary) text-(--text-primary) border border-(--border-primary) h-8 cursor-pointer"
        >
          {isRunning ? (
            <Loader2 className="w-3.5 h-3.5 sm:mr-1.5 animate-spin text-(--text-tertiary)" />
          ) : (
            <Play className="w-3.5 h-3.5 sm:mr-1.5" />
          )}
          <span className="hidden sm:inline">Run Code</span>
        </Button>

        <Button
          size="sm"
          onClick={onSubmit}
          disabled={isRunning || isSubmitting}
          className="font-medium bg-emerald-600 hover:bg-emerald-700 text-white h-8 border-none cursor-pointer"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 sm:mr-1.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5 sm:mr-1.5" />
          )}
          <span className="hidden sm:inline">Submit</span>
        </Button>
      </div>
    </div>
  );
}
