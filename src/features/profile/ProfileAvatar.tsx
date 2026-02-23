import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileAvatarProps {
    name?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

function getInitials(name?: string): string {
    if (!name) return "U";
    return name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export default function ProfileAvatar({
    name,
    size = "md",
    className = "",
}: ProfileAvatarProps) {
    const sizeClass = {
        sm: "h-8 w-8 text-xs",
        md: "h-9 w-9 text-sm",
        lg: "h-20 w-20 text-2xl font-bold",
    }[size];

    return (
        <Avatar className={`${sizeClass} cursor-pointer ring-2 ring-primary/20 hover:ring-primary/60 transition-all duration-200 ${className}`}>
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {getInitials(name)}
            </AvatarFallback>
        </Avatar>
    );
}
