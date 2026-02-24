import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "relative inline-flex h-7 w-13 shrink-0 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--btn-primary-ring) focus-visible:ring-offset-2 border-transparent transition-colors duration-200 ease-in-out",
                isDark ? "bg-zinc-800" : "bg-gray-200"
            )}
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle theme"
        >
            <span className="sr-only">Toggle theme</span>
            <span
                className={cn(
                    "pointer-events-none relative size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out flex items-center justify-center",
                    isDark ? "translate-x-3" : "-translate-x-3"
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
