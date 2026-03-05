import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileAvatar from "./ProfileAvatar";
import { LogOut, User, Languages } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { PREFERRED_LANGUAGE_OPTIONS } from "@/features/submission/languageOptions";
import LanguagePickerModal from "./LanguagePickerModal";

interface ProfileDropdownProps {
    name?: string;
    email?: string;
    username?: string;
    imageUrl?: string;
    preferredLanguage?: string;
}

export default function ProfileDropdown({ name, email, username, imageUrl, preferredLanguage }: ProfileDropdownProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isLangModalOpen, setIsLangModalOpen] = useState(false);

    const [langValue, setLangValue] = useState(
        () => localStorage.getItem("preferredLanguage") || preferredLanguage || ""
    );

    const currentLangLabel = PREFERRED_LANGUAGE_OPTIONS.find(
        (o) => o.value === langValue?.toLowerCase()
    )?.label ?? "Not set";

    const handleLanguageChanged = (lang: string) => {
        setLangValue(lang);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        queryClient.clear();
        navigate("/login");
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="outline-none focus:outline-none flex items-center gap-2.5 hover:bg-(--bg-tertiary) p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-(--border-primary) dark:hover:border-white/10"
                        aria-label="Open profile menu"
                    >
                        <ProfileAvatar name={name} size="sm" imageUrl={imageUrl} />
                        <div className="hidden sm:flex flex-col items-start text-left">
                            <span className="text-sm font-semibold text-(--text-primary) dark:text-white leading-none">
                                {name ? name.split(' ')[0] : 'User'}
                            </span>
                            <span className="text-[11px] font-medium text-(--text-tertiary) mt-0.5 leading-none">
                                @{username || 'user'}
                            </span>
                        </div>
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-56 rounded-xl border border-border bg-popover shadow-xl"
                >
                    <DropdownMenuLabel className="px-3 py-2">
                        <p className="text-sm font-semibold text-foreground leading-tight truncate">
                            {name ?? "User"}
                        </p>
                        {email && (
                            <p className="text-xs text-muted-foreground truncate">{email}</p>
                        )}
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => navigate("/profile")}
                        className="gap-2 cursor-pointer hover:bg-accent rounded-lg mx-1"
                    >
                        <User size={15} className="text-muted-foreground" />
                        Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => setIsLangModalOpen(true)}
                        className="gap-2 cursor-pointer hover:bg-accent rounded-lg mx-1"
                    >
                        <Languages size={15} className="text-muted-foreground" />
                        Language
                        <span className="ml-auto text-[11px] font-medium text-muted-foreground">
                            {currentLangLabel}
                        </span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="gap-2 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg mx-1 mb-1"
                    >
                        <LogOut size={15} />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <LanguagePickerModal
                isOpen={isLangModalOpen}
                onClose={() => setIsLangModalOpen(false)}
                currentLanguage={langValue}
                onLanguageChanged={handleLanguageChanged}
            />
        </>
    );
}

