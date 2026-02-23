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
import { LogOut, User } from "lucide-react";

interface ProfileDropdownProps {
    name?: string;
    email?: string;
}

export default function ProfileDropdown({ name, email }: ProfileDropdownProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="outline-none focus:outline-none"
                    aria-label="Open profile menu"
                >
                    <ProfileAvatar name={name} size="md" />
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
    );
}
