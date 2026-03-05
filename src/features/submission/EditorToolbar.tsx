import type { Language } from "@/types/submission";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Send } from "lucide-react";
import { languageOptions } from "./languageOptions";

interface EditorToolbarProps {
    language: Language;
    onLanguageChange: (value: Language) => void;
    onSubmit: () => void;
    isRunning: boolean;
    isSubmitting: boolean;
    saveStatus?: "idle" | "saving" | "saved";
}

export default function EditorToolbar({
    language,
    onLanguageChange,
    onSubmit,
    isRunning,
    isSubmitting,
    saveStatus = "idle",
}: EditorToolbarProps) {
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-(--border-primary) bg-(--bg-tertiary)/50">
            <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider">
                    Language:
                </span>
                <Select
                    value={language}
                    onValueChange={(val) => onLanguageChange(val as Language)}
                >
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

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                {/* Save Status Indicator */}
                <span
                    className={`text-[11px] font-medium flex items-center gap-1 transition-all duration-300 ${saveStatus === "saving"
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

                <Button
                    size="sm"
                    onClick={onSubmit}
                    disabled={isRunning || isSubmitting}
                    className="font-medium bg-emerald-600 hover:bg-emerald-700 text-white h-8 border-none cursor-pointer"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    ) : (
                        <Send className="w-3.5 h-3.5 mr-1.5" />
                    )}
                    Submit
                </Button>
            </div>
        </div>
    );
}
