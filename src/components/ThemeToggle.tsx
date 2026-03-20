import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={(e) => e.preventDefault()}
      disabled
      className={cn(
        "relative inline-flex h-7 w-13 shrink-0 cursor-not-allowed items-center justify-center rounded-full border-transparent transition-colors duration-200 ease-in-out opacity-40 grayscale",
        isDark ? "bg-zinc-800" : "bg-gray-200",
      )}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={cn(
          "pointer-events-none relative size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out flex items-center justify-center",
          isDark ? "translate-x-3" : "-translate-x-3",
        )}
      >
        {isDark ? (
          <Moon className="size-2 text-zinc-800" />
        ) : (
          <Sun className="size-2 text-amber-500" />
        )}
      </span>
    </button>
  );
}
