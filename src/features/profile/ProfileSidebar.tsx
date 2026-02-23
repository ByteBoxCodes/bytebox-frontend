import type { IUserProfile } from "@/types/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Github,
    Linkedin,
    Twitter,
    Globe,
    MapPin,
    Calendar,
    Mail,
    Link2,
    Star,
} from "lucide-react";

interface ProfileSidebarProps {
    user: IUserProfile;
}

function getInitials(name?: string) {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

function formatDate(d?: string) {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "long" });
}

function SideStatPill({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <span className="text-xs text-(--text-secondary) dark:text-(--dk-text-muted)">{label}</span>
            <span className="text-xs font-semibold text-(--text-primary) dark:text-(--dk-text)">{value}</span>
        </div>
    );
}

const SOCIALS = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Globe, href: "#", label: "Website" },
];

export default function ProfileSidebar({ user }: ProfileSidebarProps) {
    return (
        <aside className="w-full lg:w-72 lg:shrink-0 space-y-5">

            {/* Avatar + Name */}
            <div className="flex flex-col items-center text-center gap-3 pt-2">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20 shadow-xl">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-xl font-bold leading-tight text-(--text-primary) dark:text-(--dk-text)">
                        {user.name}
                    </h1>
                    <p className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted) mt-0.5">
                        @{user.username}
                    </p>
                </div>
                {/* Rank badge — static, replace later */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                                 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Star size={11} /> ByteBox Knight
                </span>
            </div>

            {/* Bio — static, replace later */}
            <p className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted) text-center leading-relaxed px-2">
                Passionate coder. Building things one problem at a time. ☕
            </p>

            {/* Social icons */}
            <div className="flex justify-center gap-3">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="flex h-8 w-8 items-center justify-center rounded-lg
                                   bg-(--bg-secondary) dark:bg-(--dk-surface)
                                   border border-border/60
                                   text-(--text-secondary) dark:text-(--dk-text-muted)
                                   hover:text-(--text-primary) dark:hover:text-(--dk-text)
                                   hover:border-primary/40 transition-colors duration-150"
                    >
                        <Icon size={14} />
                    </a>
                ))}
            </div>

            <hr className="border-border/40" />

            {/* Meta info */}
            <div className="space-y-2.5 text-sm px-1">
                <div className="flex items-center gap-2.5 text-(--text-secondary) dark:text-(--dk-text-muted)">
                    <MapPin size={14} className="shrink-0" />
                    <span className="text-xs">Bangalore, India</span> {/* static */}
                </div>
                <div className="flex items-center gap-2.5 text-(--text-secondary) dark:text-(--dk-text-muted)">
                    <Mail size={14} className="shrink-0" />
                    <span className="text-xs truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-(--text-secondary) dark:text-(--dk-text-muted)">
                    <Calendar size={14} className="shrink-0" />
                    <span className="text-xs">Joined {formatDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2.5 text-(--text-secondary) dark:text-(--dk-text-muted)">
                    <Link2 size={14} className="shrink-0" />
                    <a href="#" className="text-xs hover:underline truncate">
                        portfolio.io/{user.username} {/* static */}
                    </a>
                </div>
            </div>

            <hr className="border-border/40" />

            {/* Community stats — static, replace later */}
            <div className="px-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted) mb-2">
                    Community
                </p>
                <SideStatPill label="Global Rank" value="#4,218" />
                <SideStatPill label="Contest Rating" value="1,632" />
                <SideStatPill label="Streak" value="12 days 🔥" />
                <SideStatPill label="Reputation" value="340 pts" />
            </div>
        </aside>
    );
}
