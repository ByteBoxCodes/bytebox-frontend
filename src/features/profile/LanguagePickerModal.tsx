import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PREFERRED_LANGUAGE_OPTIONS } from "@/features/submission/languageOptions";
import { useUpdatePreferredLanguage } from "@/hooks/useUpdatePreferredLanguage";
import { Check } from "lucide-react";

/* ── tiny inline SVG icons for each language ── */
const langIcons: Record<string, React.ReactNode> = {
  c: (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path
        fill="#659AD2"
        d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3 1 3.1l.1.1c.5.8 1.3 1.5 1.9 1.8l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-2-.8-4.3-2.9-5.4z"
      />
      <path
        fill="#fff"
        d="M64 88c-13.3 0-24-10.7-24-24s10.7-24 24-24c7.6 0 14.6 3.5 19.2 9.6l-9.6 6.4C71 52.8 67.6 52 64 52c-6.6 0-12 5.4-12 12s5.4 12 12 12c3.6 0 7-1.8 9.6-4l9.6 6.4C78.6 84.5 71.6 88 64 88z"
      />
    </svg>
  ),
  cpp: (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path
        fill="#00599C"
        d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3 1 3.1l.1.1c.5.8 1.3 1.5 1.9 1.8l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-2-.8-4.3-2.9-5.4z"
      />
      <path
        fill="#fff"
        d="M64 88c-13.3 0-24-10.7-24-24s10.7-24 24-24c7.6 0 14.6 3.5 19.2 9.6l-9.6 6.4C71 52.8 67.6 52 64 52c-6.6 0-12 5.4-12 12s5.4 12 12 12c3.6 0 7-1.8 9.6-4l9.6 6.4C78.6 84.5 71.6 88 64 88z"
      />
      <path
        fill="#fff"
        d="M91 64h4v-4h4v4h4v4h-4v4h-4v-4h-4zM105 64h4v-4h4v4h4v4h-4v4h-4v-4h-4z"
      />
    </svg>
  ),
  java: (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path
        fill="#EA2D2E"
        d="M47.6 98.6c0 0-5.2 3-3.7 5.2 1.5 2.2 12.5 1.7 17.5-0.6 0 0 1.2 1.1 3 1.5-10.7 4.6-24.3-0.3-16.8-6.1z"
      />
      <path
        fill="#EA2D2E"
        d="M44.3 89.1c0 0-5.8 4.3-2.8 6.5 3 2.2 10.6 1.7 16.5-1 0 0 0.9 1 2.3 1.3-13 3.9-27.4-0.3-16-6.8z"
      />
      <path
        fill="#EA2D2E"
        d="M61.7 71.4c4.3-4.5 2.2-8.5 2.2-8.5s9.8 5 5.3 11.3c-12.5 17.5-47.4 4.4-7.5-2.8z"
      />
      <path
        fill="#EA2D2E"
        d="M92 101.5c0 0 3.8 3.2-4.2 5.6-15.2 4.6-63.2 6-76.6 0.2-4.8-2.1 4.2-5 7-5.6 3-0.6 4.7-0.5 4.7-0.5-5.4-3.8-34.8 7.5-14.9 10.7 54.1 8.8 98.6-3.9 84-10.4z"
      />
      <path
        fill="#EA2D2E"
        d="M48.9 72.6c0 0-24.7 5.9-8.7 8 6.7 0.9 20.1 0.7 32.6-0.4 10.2-0.8 20.4-2.6 20.4-2.6s-3.6 1.5-6.2 3.3c-24.9 6.6-73-3.4-59.2-6.5 11.7-2.6 21.1-1.8 21.1-1.8z"
      />
      <path
        fill="#EA2D2E"
        d="M83.3 91.1c25.3-13.2 13.6-25.8 5.4-24.1-2 0.4-2.9 0.8-2.9 0.8s0.7-1.2 2.2-1.7c16.1-5.7 28.5 16.7-5.2 25.5 0 0 0.4-0.4 0.5-0.5z"
      />
      <path
        fill="#EA2D2E"
        d="M69.4 3.7s14 14-13.3 35.5c-21.8 17.2-5 27.1 0 38.3-12.8-11.5-22.1-21.7-15.8-31.2 9.3-13.9 35-20.7 29.1-42.6z"
      />
      <path
        fill="#EA2D2E"
        d="M51.1 109.2c24.3 1.6 61.6-0.9 62.5-12.5 0 0-1.7 4.4-20 7.8-20.8 3.9-46.4 3.4-61.6 0.9 0 0.1 3.1 2.6 19.1 3.8z"
      />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <linearGradient
        id="pyA"
        x1="12.959"
        x2="12.959"
        y1="14.023"
        y2="7.589"
        gradientTransform="matrix(6.563 0 0 -6.563 16.076 116.648)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#387EB8" />
        <stop offset="1" stopColor="#366994" />
      </linearGradient>
      <path
        fill="url(#pyA)"
        d="M63.4 18.1c-3 0-5.8.3-8.3.8-7.4 1.5-8.7 4.7-8.7 10.6v7.8h17.5v2.6H38.3c-5.1 0-9.5 3-10.9 8.8-1.6 6.6-1.7 10.7 0 17.6 1.2 5.1 4.2 8.8 9.3 8.8h6V66c0-5.7 5-10.8 10.9-10.8h17.4c4.8 0 8.7-4 8.7-8.8V28.6c0-4.7-4-8.2-8.7-9.1-3-0.6-6.1-1.4-7.6-1.4zm-9.6 6.3c1.8 0 3.3 1.5 3.3 3.4 0 1.8-1.5 3.3-3.3 3.3-1.9 0-3.4-1.5-3.4-3.3 0-1.9 1.5-3.4 3.4-3.4z"
      />
      <linearGradient
        id="pyB"
        x1="19.128"
        x2="19.128"
        y1="7.348"
        y2="14.161"
        gradientTransform="matrix(6.563 0 0 -6.563 16.076 116.648)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFE052" />
        <stop offset="1" stopColor="#FFC331" />
      </linearGradient>
      <path
        fill="url(#pyB)"
        d="M82.5 37.8V47c0 6-5.1 11.1-10.9 11.1H54.2c-4.8 0-8.7 4.1-8.7 8.8v17.9c0 4.7 4.1 7.5 8.7 8.8 5.5 1.6 10.8 1.9 17.4 0 4.4-1.2 8.7-3.7 8.7-8.8V68h-17.4v-2.6h26.1c5.1 0 7-3.5 9.3-8.8 2.4-5.4 2.3-10.6 0-17.6-1.6-5-4.7-8.8-9.3-8.8h-7zm-9.7 42c1.9 0 3.4 1.5 3.4 3.3 0 1.9-1.5 3.4-3.4 3.4-1.8 0-3.3-1.5-3.3-3.4 0-1.8 1.5-3.3 3.3-3.3z"
      />
    </svg>
  ),
};

interface LanguagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: string | null;
  onLanguageChanged?: (lang: string) => void;
}

export default function LanguagePickerModal({
  isOpen,
  onClose,
  currentLanguage,
  onLanguageChanged,
}: LanguagePickerModalProps) {
  const { mutate: updateLang, isPending } = useUpdatePreferredLanguage();

  // Manage local selection state
  const [selectedLang, setSelectedLang] = useState("");

  // Reset local state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedLang(currentLanguage?.toLowerCase() || "");
    }
  }, [isOpen, currentLanguage]);

  const handleSave = () => {
    if (!selectedLang) return;
    updateLang(selectedLang, {
      onSuccess: () => {
        onLanguageChanged?.(selectedLang);
        onClose();
      },
    });
  };

  const hasChanged = selectedLang !== currentLanguage?.toLowerCase();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-[350px] p-0 gap-0 max-h-[90vh] flex flex-col overflow-hidden rounded-xl shadow-lg">
        <DialogHeader className="px-5 py-4 border-b border-border/50 shrink-0 text-left">
          <DialogTitle className="text-base font-bold text-foreground">
            Choose Your Language
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1 text-left">
            Select your preferred programming language.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 py-5 sm:px-6 bg-muted/10 overflow-y-auto">
          <div className="flex flex-col gap-3 w-full max-w-lg mx-auto">
            {PREFERRED_LANGUAGE_OPTIONS.map((opt) => {
              const isSelected = selectedLang === opt.value;
              const isDisabled = opt.comingSoon;

              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={!!isDisabled || isPending}
                  onClick={() => setSelectedLang(opt.value)}
                  className={`
                    group relative flex items-center justify-between w-full p-3.5 sm:px-4 sm:py-4 rounded-xl border transition-all duration-200 text-left
                    ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed border-dashed border-border/60 bg-muted/20"
                        : isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/30 shadow-sm"
                          : "border-border/60 hover:border-primary/40 hover:shadow-sm bg-background"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon Container */}
                    <div
                      className={`
                        flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg shrink-0 transition-colors
                        ${
                          isSelected
                            ? "bg-primary/20 dark:bg-primary/20"
                            : "bg-muted/60 group-hover:bg-muted"
                        }
                      `}
                    >
                      {langIcons[opt.value] ? (
                        <div className="scale-75 sm:scale-90 w-full h-full flex items-center justify-center">
                          {langIcons[opt.value]}
                        </div>
                      ) : (
                        <span className="text-base font-bold text-muted-foreground">
                          {opt.label[0]}
                        </span>
                      )}
                    </div>

                    {/* Text Area */}
                    <div className="flex flex-col justify-center">
                      <span
                        className={`text-sm sm:text-base font-semibold ${
                          isSelected ? "text-primary dark:text-primary" : "text-foreground"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium">
                        {isDisabled ? "Will be available soon" : `Use ${opt.label} as default mode`}
                      </span>
                    </div>
                  </div>

                  {/* Radio/Check Circle indicator */}
                  <div
                    className={`
                      flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border transition-all shrink-0 ml-3
                      ${
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground scale-110"
                          : "bg-transparent border-border/80 group-hover:border-primary/40"
                      }
                    `}
                  >
                    {isSelected && (
                      <Check size={14} strokeWidth={3} className="sm:w-4 sm:h-4" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <DialogFooter className="p-3 border-t border-border/50 bg-muted/10 flex flex-row justify-end gap-2 shrink-0">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="h-8 text-xs px-3"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isPending || !hasChanged}
            className="h-8 text-xs px-3"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
